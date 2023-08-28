const { default: mongoose} = require("mongoose");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// @desc Register User
// @route POST api/user/register
// @access public route

const createUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Mandatory field check
    if (!username || !password) {
      return res.status(400).json({ message: "All feild's are Mandatory" });
    }

    // User Validation Check
    const isUserValid = await User.findOne({ username });

    if (isUserValid) {
      return res.status(400).json({ message: "User is already present" });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const user = await User.create({
      username,
      password:hashedPassword,
    });

    if (user) {
      res.status(201).json(user);
    }
  } catch (error) {
    res.status(500).json(`Register user failed: ${error}`);
  }
};

// @desc Login User
// @route POST api/user/register
// @access public route
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Mandatory field check
    if (!username || !password) {
      return res.status(400).json({ message: "All feild's are Mandatory" });
    }

    //User Validation and then token is sent
    const user = await User.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: "1d" });
      res.status(200).json({ token: token });
    } else {
      res.status(401).json({ message: "Invalid Credentails Provided" });
    }
  } catch (error) {
    res.status(500).json(`Login User Failed: ${error}`);
  }
};
module.exports = { createUser, loginUser };
