const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const cookie = require("cookie");

//register
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.json({
        success: false,
        message: "User Already exists with the same email! Please try again",
      });

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });

    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Registration successful",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

//logout

const logoutUser = (req, res) => {
 
  res.clearCookie("test").json({
    
    success: true,
    message: "Logged out successfully!",
  });
};

//login
const test = async (req, res) => {
  const { email, password } = req.body;

  try {
    const Users = await User.findOne({ email: email });

    if (!Users) {
      res.json({
        success: false,
        message: "no user found",
      });
    }

    const checkPasswordMatch = await bcrypt.compare(password, Users.password);
    if (!checkPasswordMatch)
      return res.json({
        success: false,
        message: "Incorrect password! Please try again",
      });

    const token = jwt.sign(
      {
        id: Users._id,
        role: Users.role,
        email: Users.email,
        userName: Users.userName,
      },
      "CLIENT_SECRET_KEY",
      {
        expiresIn: "60m",
      }
    );

    res.cookie("test", token);
    return res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const authcheck = (req, res) => {
  //   const decoded = jwt.verify(req.cookies.test, "CLIENT_SECRET_KEY");
  res.json({
    success : true,
    user: req.user,
  });
};

const authmid = (req, res, next) => {
  {
    const token = req.cookies.test; // Use req.cookies instead of req.cookie


    if (!token)
      return res.status(401).json({
        success: false,
        message: "Unauthorised user!",
      });

    try {
      const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({
        success: false,
        message: "Unauthorised user!",
      });
    }
  }
};

module.exports = { registerUser, logoutUser, test, authcheck, authmid };
