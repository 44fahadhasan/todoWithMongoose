// dependencies
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = require("../schemas/userSchema");
const veryfyToken = require("../middlewares/veryfyToken");

// init route
const userRoutes = express.Router();

// create a user modle (like user collection)
const User = mongoose.model("User", userSchema);

// singup a new  user
userRoutes.post("/singup", async (req, res) => {
  const hashPassword = await bcrypt.hash(req.body.password, 10);

  try {
    const user = new User({
      name: req.body.name,
      userName: req.body.userName,
      password: hashPassword,
    });

    const result = await user.save();
    res.status(200).send(result);
    //
  } catch (error) {
    res.status(500).send(error);
  }
});

userRoutes.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ userName: req.body.userName });

    if (user) {
      const isValidatePassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!isValidatePassword) {
        return res.status(401).send("unauthorized");
      }
      //

      // create a token
      const token = jwt.sign(
        { userName: user.userName, usrId: user._id },
        process.env.JWT_TOKEN_KEY,
        {
          expiresIn: "9h",
        }
      );

      res.status(200).send(token);
      //
    } else {
      res.status(401).send("unauthorized");
    }
    //
  } catch (error) {
    res.status(401).send("unauthorized");
  }
});

userRoutes.get("/", veryfyToken, (req, res) => {
  res.send(req.decoded);
});

module.exports = userRoutes;
