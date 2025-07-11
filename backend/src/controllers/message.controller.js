import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const currentUserId = req.user._id;
    const users = await User.find({ _id: { $ne: currentUserId } }).select(
      "-password"
    );
    res.status(200).json(users);
  } catch (error) {
    console.log("Error in message controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addMessage = async (req, res) => {
  try {
    const { content, receiverId } = req.body;
    const sender = req.user._id;

    const receiver = await User.findById(receiverId);
    if (!receiver)
      return res.status(404).json({ message: "receiver not found" });

    const newMessage = new Message({
      sender,
      content,
      receiver: receiverId,
    });

    await newMessage.save();

    res.status(200).json(newMessage);
  } catch (error) {
    console.log("Error in addMessage:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const receiverId = req.params.id;
    const senderId = req.user._id;

    const messages = await Message.find({
      $or: [
        {
          sender: senderId,
          receiver: receiverId,
        },
        { sender: receiverId, receiver: senderId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
