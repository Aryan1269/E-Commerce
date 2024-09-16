// authMiddleware.js
// const admin = require('../config/firebaseAdmin_config');

exports.checkAuth = async (req, res, next) => {
  console.log(req.headers.accessToken);
  next();
  try {
    // Ensure the access token is provided in the headers
    const accessToken = req.headers.accessToken;

    if (!accessToken) {
      return res.status(401).json({ message: 'No access token provided' });
    }

    const firebaseUser = await admin.auth().verifyIdToken(accessToken);
    console.log("Firebase User:", firebaseUser);
    
    // Optionally, you can attach the user info to the request object
    req.user = firebaseUser;

    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
