const express = require("express");
const { checkauth } = require("../middleware/auth");
const router = express.Router();
const admin = require('../config/firebaseAdmin_config');


router.post(
  "/check_auth",
  async (req, res, next) => {
    console.log(req.headers.accesstoken);
    try {
      // Ensure the access token is provided in the headers
      const accessToken = req.headers.accesstoken;

      if (!accessToken) {
        return res.status(401).json({ message: "No access token provided" });
      }

      const firebaseUser = await admin.auth().verifyIdToken(accessToken);
      console.log("Firebase User:", firebaseUser);

      // Optionally, you can attach the user info to the request object
      req.user = firebaseUser;

      next();
    } catch (error) {
      console.error("Error verifying token:", error);
      return res.status(401).json({ message: "Unauthorized" });
    }
  },
  (req, res) => {
    res.json({
      ok: "ok",
    });
  }
);

module.exports = router;
