import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
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
        const {text , image} = req.body;
        const senderId = req.user._id;
        const {id:recipientId} = req.params;
        let imageurl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageurl = uploadResponse.secure_url
        }
        const newMessage = new Message({
            text,
            image:imageurl,
            senderId:senderId,
            reciverId:recipientId,
        })
        await newMessage.save();
        res.status(200).json(newMessage);
        //TODO SOCEKT IO
    }
    catch(e){
        console.log("error in message controller sendMessage",e.message)
    }

}