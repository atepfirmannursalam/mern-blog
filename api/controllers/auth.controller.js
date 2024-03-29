import User from "../models/User.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

// sign-up controller
export const signup = async (req, res, next) => {
  // condition checking
  const { username, email, password } = req.body;
  if (!username || !email || !password || username === "" || email === "" || password === "") {
    next(errorHandler(400, "All fields are required"));
  }

  // Hashed password
  const hashedPassword = bcryptjs.hashSync(password, 10);

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

// sign-in controller
export const signin = async (req, res, next) => {
  //get email & password from user
  const { email, password } = req.body;

  // checking email $ password
  if (!email || !password || email === "" || password === "") {
    // err handler
    next(errorHandler(400, "All field are required"));
  }

  try {
    // checking email
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }

    // checking password
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid password"));
    }

    // authetication email & password using JWT
    const token = jwt.sign({ id: validUser._id }, process.env.jWT_SECRET);

    // spread password / memunculkan data tanpa password
    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { email, name, googlePhoteURL } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("acces_token", token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username: name.toLowerCase().split(" ").join("") + Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhoteURL,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("acces_token", token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
