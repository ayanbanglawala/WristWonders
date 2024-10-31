import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const protectRoute = async (req, res, next) => {
  try {
    // Check if the token is sent in cookies or headers
    let token = req.cookies?.jwt || req.headers.authorization?.split(" ")[1];

    // If no token is found, return error
    if (!token) {
      return res.status(401).json({ error: 'Not authorized, token is missing' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ error: 'Not authorized, token is missing or invalid' });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Not authorized, token is missing or invalid' });
  }
};

export default protectRoute;
