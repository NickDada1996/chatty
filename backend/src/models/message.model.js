import mongoose, { Schema } from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  receiver: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  content: {
    type: String,
    default: [],
  },
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
