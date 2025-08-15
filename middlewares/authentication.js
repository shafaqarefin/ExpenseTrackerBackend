const jwt = require('jsonwebtoken');
const { getUserFromToken } = require('../services/authServices');

function restrictToLoggedInUser(req, res, next) {
  try {
    // Get token from cookies
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Not logged in' });

    // Verify token
    const decoded = getUserFromToken(token)

    // Attach user info to request object
    req.user = decoded;

    // Token valid → continue
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

module.exports = {restrictToLoggedInUser};
