import { AuthModel } from "../models/Auth.js";

export const getUserInfo = async (req, res) => {
  try {
    const user = await AuthModel.findById(req.params.userID);
    return res.json(user);
  } catch (error) {
    res.json(error);
  }
};
