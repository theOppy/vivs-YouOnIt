import { AuthModel } from "../models/Auth.js";
import { TweetModel } from "../models/Tweet.js";

export const getTweetInfo = async (req, res) => {
  try {
    const user = await AuthModel.findById(req.params.userID);
    return res.json(user);
  } catch (error) {
    res.json(error);
  }
};

export const getTweet = async (req, res) => {};
