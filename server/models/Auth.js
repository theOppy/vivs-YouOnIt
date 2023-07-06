import mongoose from "mongoose";

const AuthSchema = new mongoose.Schema({
  name: String,
  location: String,
  occupation: String,
  file: {
    type: String,
    required: true,
  },
  coverPic: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  bio: String,
  dob: String,
});

export const AuthModel = mongoose.model("users", AuthSchema);
