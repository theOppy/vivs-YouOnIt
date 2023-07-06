import express from "express";
import {
  comment,
  deleteTweet,
  likeUnlikeTweet,
  tweet,
} from "../controllers/tweet.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});
const router = express.Router();

router.post("/", upload.single("photo"), tweet);
router.delete("/delete", deleteTweet);
router.patch("/like", likeUnlikeTweet);
router.patch("/comments", comment);

export { router as TweetRouter };
