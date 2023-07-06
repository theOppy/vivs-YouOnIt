import express from "express";
import {
  getAllTweets,
  getSIngleTweet,
  getUserTweets,
} from "../controllers/allTweets.js";

const router = express.Router();

router.get("/", getAllTweets);
router.get("/user/:userID", getUserTweets);
router.get("/tweet/:tweetID", getSIngleTweet);

export { router as allTweets };
