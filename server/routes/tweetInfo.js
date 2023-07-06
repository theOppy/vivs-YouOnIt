import express from "express";
import { getTweet, getTweetInfo } from "../controllers/getTweetInfo.js";

const router = express.Router();

router.get("/:userID", getTweetInfo);

export { router as TweetInfoRouter };
