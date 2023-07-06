import { AuthModel } from "../models/Auth.js";
import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";
export const Register = async (req, res) => {
  const { name, location, occupation, username, password } = req.body;

  const user = await AuthModel.findOne({ username });

  // if (user) {
  //   return res.json(`Username already exists!`);
  // }
  const files1 = req.files["file1"][0];
  const files2 = req.files["file2"][0];

  const file = files1.filename;
  const cover = files2.filename;

  console.log(file, cover);

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
      const newUser = new AuthModel({
        name,
        location,
        occupation,
        file: file,
        coverPic: cover,
        username,
        password: hash,
      });
      await newUser.save();
      console.log("Hashed password:", hash);

      return res.json(newUser);
    });
  });
};

export const Login = async (req, res) => {
  const { username, password } = req.body;
  const user = await AuthModel.findOne({ username });

  if (!user) {
    return res.json(`User doesn't Exist!`);
  }

  bcrypt.compare(password, user.password, function (err, isMatch) {
    if (err) {
      console.error("Error while comparing passwords:", err);
      return;
    }

    if (isMatch) {
      console.log("Passwords match! User is authenticated.");
    } else {
      console.log("Passwords do not match! User is not authenticated.");
    }
  });

  const token = jwt.sign({ id: user._id }, process.env.SECRETS);
  return res.json({ token: token, userID: user._id });
};

export const follow = async (req, res) => {
  const tweet = await AuthModel.findById(req.body.followID);

  if (tweet.followers.includes(req.body.userID)) {
    await AuthModel.findByIdAndUpdate(
      req.body.followID,
      {
        $pull: { followers: req.body.userID },
      },
      {
        new: true,
      }
    ),
      await AuthModel.findByIdAndUpdate(
        req.body.userID,
        {
          $pull: { following: req.body.followID },
        },
        {
          new: true,
        }
      );
  } else {
    try {
      await AuthModel.findByIdAndUpdate(
        req.body.followID,
        {
          $push: { followers: req.body.userID },
        },
        {
          new: true,
        }
      ),
        await AuthModel.findByIdAndUpdate(
          req.body.userID,
          {
            $push: { following: req.body.followID },
          },
          {
            new: true,
          }
        );

      const user = await AuthModel.findById(req.body.userID);
      res.json(user);
    } catch (error) {
      res.json(err);
    }
  }
};

export const unfollow = async (req, res) => {
  try {
    await AuthModel.findByIdAndUpdate(
      req.body.followID,
      {
        $pull: { followers: req.body.userID },
      },
      {
        new: true,
      }
    ),
      await AuthModel.findByIdAndUpdate(
        req.body.userID,
        {
          $pull: { following: req.body.followID },
        },
        {
          new: true,
        }
      );

    const user = await AuthModel.findById(req.body.userID);
    res.json(user);
  } catch (error) {
    res.json(err);
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await AuthModel.find();
    res.json(users);
  } catch (error) {
    res.json(error);
  }
};

export const updateUser = async (req, res) => {
  const { name, username, location, occupation, bio, dob } = req.body.editUser;
  try {
    await AuthModel.findByIdAndUpdate(req.body.userID, {
      name: name,
      username: username,
      location: location,
      occupation: occupation,
      bio: bio,
      dob: dob,
    });
    const auth = await AuthModel.findById(req.body.userID);
    res.json(auth);
  } catch (error) {
    res.json(error);
  }
};
