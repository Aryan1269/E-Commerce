const express = require("express");

const {
  registerUser,
  logoutUser,
  test,
  authcheck,
  authmid,
} = require("../controller/auth");

const router = express.Router();

router.post("/register", registerUser);

router.get("/logout", logoutUser);

router.post("/test", test); //login

router.get("/check", authmid, authcheck);

module.exports = router;
