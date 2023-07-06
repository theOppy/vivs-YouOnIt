import express from "express";
import { AuthModel } from "../models/Auth.js";
import { TweetModel } from "../models/Tweet.js";

const router = express.Router();

router.get("/:userID", async (req, res) => {
  try {
    const otherUser = await AuthModel.findById(req.params.userID);

    return res.json(otherUser);
  } catch (error) {
    res.json(error);
  }
});

router.get("/tweets/:userID", async (req, res) => {
  try {
    const tweets = await TweetModel.find(req.params);

    return res.json(tweets);
  } catch (error) {
    res.json(error);
  }
});

export { router as OtherUserRouter };
