import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import mongoose from "mongoose";
export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserid = req.user._id;
    const filterdUsers = await User.find({
      _id: { $ne: loggedInUserid },
    }).select("-password");
    res.status(200).json(filterdUsers);
  } catch (e) {
    console.log("error in messagecontroller", e.message);

    res.status(400).json({ message: e.message });
  }
};
export const getMessages = async (req, res) => {
    try{
        const { id: userToChatId } = req.params;
  const senderId = req.user._id;
  const messages = await Message.find({
    $or: [
      {
        senderId: senderId,
        reciverId: userToChatId,
      },
      {
        senderId: userToChatId,
        reciverId: senderId,
      },
    ],
  });
      res.status(200).json(messages)

    }
    catch(e){
        console.log("error in message controller getmessages",e.message)
        res.status(400).json({message:e.message})
    }
  
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const senderId = req.user._id;
    const { id: reciverId } = req.params;

    // Do NOT store base64 in DB; create message with placeholder image
    const newMessage = new Message({
      text,
      image: null,
      senderId,
      reciverId,
    });

    const saved = await newMessage.save();

    // Respond immediately so UI can be fast/optimistic
    res.status(201).json(saved);

    // Upload image asynchronously and update message when done
    if (image) {
      (async () => {
        try {
          const uploadResponse = await cloudinary.uploader.upload(image);
          const imageurl = uploadResponse.secure_url;

          await Message.updateOne(
            { _id: saved._id },
            { $set: { image: imageurl } }
          );

          // Optionally notify clients (Socket.IO) that message image is ready
          // const io = req.app.get('io');
          // if (io) io.to(String(reciverId)).emit('message:updated', { _id: saved._id, image: imageurl });
        } catch (err) {
          console.log('Image upload failed', err.message);
          // Optionally mark failure or notify sender
          // const io = req.app.get('io');
          // if (io) io.to(String(senderId)).emit('message:uploadFailed', { _id: saved._id });
        }
      })();
    }
  } catch (e) {
    console.log('error in message controller sendMessage', e.message);
    res.status(500).json({ message: e.message });
  }
}