const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

module.exports.userVerification = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ status: false, message: "Unauthorized" });
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
    } catch (err) {
      return res.status(401).json({ status: false, message: "Invalid token" });
    }

    if (!decodedToken || !decodedToken.userId) {
      return res.status(401).json({ status: false, message: "Invalid token format" });
    }

    const userId = decodedToken.userId; // Do not convert to ObjectId here

    const user = await User.findById(userId);

    if (user) {
      return res.json({ status: true, user: user.username });
    } else {
      return res.status(404).json({ status: false, message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};
