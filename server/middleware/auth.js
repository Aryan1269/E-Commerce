const jwt = require("jsonwebtoken");

//auth middleware
exports.authMiddleware = async (req, res, next) => {
  const token = req.cookies.test; // Use req.cookies instead of req.cookie
  console.log(token);

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
    console.log(error);

    res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });
  }
};
