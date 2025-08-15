const jwt = require('jsonwebtoken');


const generateUserToken = (user) => {
  return jwt.sign(
    { id: user._id, name: user.name, isAdmin: user.isAdmin }, // payload
    process.env.JWT_SECRET,                                    // secret
    { expiresIn: '7d' }                                       // expiration
  );
};


const getUserFromToken = (token) => {
  try {
    if (!token) return null;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded; // { id, name, isAdmin, iat, exp }
  } catch (error) {
    console.error('JWT verification failed:', error.message);
    return null;
  }
};

module.exports = { generateUserToken, getUserFromToken };
