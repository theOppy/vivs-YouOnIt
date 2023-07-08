import express from "express";
import path from "path";
import multer from "multer";
import {
  Register,
  follow,
  getUsers,
  unfollow,
  updateUser,
} from "../controllers/auth.js";
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "file1") {
      cb(null, "images");
    } else if (file.fieldname === "file2") {
      cb(null, "images");
    }
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
    fileSize: 10 * 1024 * 1024,
  },
});

router.post(
  "/",
  upload.fields([{ name: "file1" }, { name: "file2" }]),
  Register
);
router.put("/follow", follow);
router.post("/unfollow", unfollow);
router.get("/users", getUsers);
router.patch("/update", updateUser);

export { router as AuthRouter };
