const bcrypt = require("bcrypt");
const User = require("../models/user.model");

// Function to handle user sign in
const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log(req.body);
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid password" });

    res.status(200).json({ message: "Sign in successful", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to handle user sign up
const signUp = async (req, res) => {
  try {
    console.log(req.body);

    const { username, password, ...otherData } = req.body;
    

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "Username already taken" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      username,
      password: hashedPassword,
      ...otherData
    });

    const user = await newUser.save();
    
    res.status(201).json({ message: "Sign up successful", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  signIn,
  signUp,
};
