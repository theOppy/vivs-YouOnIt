import { TweetModel } from "../models/Tweet.js";

export const getAllTweets = async (req, res) => {
  try {
    let getAll = await TweetModel.find({});
    res.json(getAll);
  } catch (error) {
    res.json(error);
  }
};

export const getUserTweets = async (req, res) => {
  try {
    let userTweets = await TweetModel.find(req.params);
    res.json(userTweets);
  } catch (error) {
    res.json(error);
  }
};

export const getSIngleTweet = async (req, res) => {
  try {
    const tweet = await TweetModel.findById(req.params.tweetID);
    return res.json(tweet);
  } catch (error) {
    res.json(error);
  }
};
