import mongoose from "mongoose";

let TweetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  file: {
    type: String,
  },
  username: {
    type: String,
    required: true,
  },
  tweet: String,
  photo: String,
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  date: {
    type: String,
    default: new Date().toUTCString().slice(5, 16),
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      default: 0,
    },
  ],
  comments: [
    {
      text: String,
      date: String,
      file: String,
      name: String,
      username: String,
    },
  ],
});

export let TweetModel = mongoose.model("tweet", TweetSchema);
