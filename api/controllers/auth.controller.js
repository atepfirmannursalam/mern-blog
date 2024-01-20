import User from "../models/User.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  // condition checking
  const { username, email, password } = req.body;
  if (!username || !email || !password || username === "" || email === "" || password === "") {
    return res.status(400).json({ message: "All field are required" });
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
    res.status(400).json({ message: error.message });
  }
};
