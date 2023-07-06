import { TweetModel } from "../models/Tweet.js";

export const tweet = async (req, res) => {
  try {
    const { name, username, tweet, file, userID, date, likes, comments } =
      req.body;

    let newTweet;
    if (req.file) {
      const filename = req.file.filename;
      newTweet = new TweetModel({
        name,
        username,
        tweet,
        file,
        userID,
        date,
        likes,
        comments,
        photo: filename,
      });
    } else {
      newTweet = new TweetModel({
        name,
        username,
        tweet,
        file,
        userID,
        date,
        likes,
        comments,
      });
    }
    await newTweet.save();

    console.log(req.file);
    return res.json(newTweet);
  } catch (error) {
    console.log(error);
  }
};

export const deleteTweet = async (req, res) => {
  try {
    await TweetModel.findOneAndDelete(req.body.tweetID);
    res.json("Deleted!");
  } catch (error) {
    res.json(error);
  }
};

export const likeUnlikeTweet = async (req, res) => {
  try {
    const userID = req.body.userID;
    const tweetID = req.body.tweetID;

    const tweet = await TweetModel.findById(tweetID);

    if (tweet.likes.includes(userID)) {
      await TweetModel.findByIdAndUpdate(tweetID, {
        $pull: { likes: userID },
      });
    } else {
      await TweetModel.findByIdAndUpdate(tweetID, {
        $push: { likes: userID },
      });
    }

    const updatedTweet = await TweetModel.findById(tweetID);
    res.json(updatedTweet);
  } catch (error) {
    res.json(error);
  }
};

export const comment = async (req, res) => {
  try {
    const comment = {
      text: req.body.text,
      file: req.body.file,
      username: req.body.username,
      name: req.body.name,
      date: req.body.date,
    };
    const tweetID = req.body.tweetID;

    await TweetModel.findByIdAndUpdate(
      tweetID,
      {
        $push: { comments: comment },
      },
      {
        new: true,
      }
    );
    console.log(tweetID);
    const tweet = await TweetModel.findById(tweetID);
    return res.json(tweet);
  } catch (error) {
    res.json(error);
  }
};

export const getTweetLikes = async (req, res) => {};
