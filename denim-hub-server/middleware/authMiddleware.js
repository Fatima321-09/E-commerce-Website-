const jwt = require("jsonwebtoken");
const User = require("../models/User");

// @desc Verify User Session via Cookie
const protect = async (req, res, next) => {
  let token;

  // 1. Look for the token in the cookies instead of headers
  token = req.cookies.token;

  if (token) {
    try {
      // 2. Verify the token using your secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Attach user to request (excluding password)
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      // Token exists but is invalid or expired
      res.status(401).json({ message: "Not authorized, session expired" });
    }
  } else {
    // No token cookie found
    res.status(401).json({ message: "Not authorized, no session found" });
  }
};

// @desc Verify Admin Privileges
const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res
      .status(403)
      .json({ message: "Access denied: Admin authorization required" });
  }
};

module.exports = { protect, admin };
