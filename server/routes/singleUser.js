import express from "express";
import { getUserInfo } from "../controllers/getUserInfo.js";
const router = express.Router();

router.get("/:userID", getUserInfo);

export { router as UserInfoRouter };
