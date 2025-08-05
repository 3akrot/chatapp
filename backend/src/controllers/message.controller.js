import User from "../models/user.model.js";
import Message from "../models/message.model.js";
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
};
