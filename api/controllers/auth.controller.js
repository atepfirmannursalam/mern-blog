import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  // condition checking
  const { username, email, password } = req.body;
  if (!username || !email || !password || username === "" || email === "" || password === "") {
    next(errorHandler(400, "All fields are required"));
  }

  // Hashed password
  const hashedPassword = bcrypt.hashSync(password, 10);

  // have the user
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    // saved to database
    await newUser.save();
    res.json("Signup successful");
  } catch (error) {
    // send error happend to users
    next(error);
  }
};
