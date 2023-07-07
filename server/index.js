import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { AuthRouter } from "./routes/auth.js";
import { LoginRouter } from "./routes/login.js";
import { TweetRouter } from "./routes/tweet.js";
import { allTweets } from "./routes/tweetspage.js";
import { UserInfoRouter } from "./routes/singleUser.js";
import { TweetInfoRouter } from "./routes/tweetInfo.js";
import bodyparser from "body-parser";
import { OtherUserRouter } from "./routes/otheruser.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express.static("images"));

app.use("/auth", AuthRouter);
app.use("/login", LoginRouter);
app.use("/tweet", TweetRouter);
app.use("/getalltweets", allTweets);
app.use("/userInfo", UserInfoRouter);
app.use("/tweetInfo", TweetInfoRouter);
app.use("/otheruser", OtherUserRouter);

mongoose
  .connect("mongodb+srv://vivekpatel1nov:VIVGamer007@cluster0.zpt8cjs.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(process.env.PORT || 3001, console.log(`Server is Actived!`))
  )
  .catch((err) => console.log(err));
