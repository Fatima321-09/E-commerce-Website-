const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generate JWT for the cookie payload
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Helper function to set the cookie
const sendTokenCookie = (res, user) => {
  const token = generateToken(user._id, user.role);

  const cookieOptions = {
    httpOnly: true, // Prevents client-side JS from accessing the cookie
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30-day expiry
    secure: process.env.NODE_ENV === "production", // HTTPS only in production
    sameSite: "Lax", // Mitigates CSRF risks
  };

  res.cookie("token", token, cookieOptions);
};

// @desc Register User
exports.registerUser = async (req, res, next) => {
  // Destructure incoming data from the frontend form
  const { name, email, password } = req.body;

  try {
    // 1. Check if user already exists in MongoDB
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      return next(new Error("User already exists"));
    }

    // 2. Create the user - This is where 500 errors often occur
    // Ensure your User model doesn't have required fields you aren't sending here
    const user = await User.create({
      name,
      email,
      password,
      role: "customer", // Default role; manually change to 'admin' in Compass
    });

    if (user) {
      sendTokenCookie(res, user);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      res.status(400);
      return next(new Error("Invalid user data entry"));
    }
  } catch (error) {
    // This catches database connection timeouts or Mongoose validation errors
    next(error);
  }
};

// @desc Login User
exports.authUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    // Use the matchPassword method defined in your User model
    if (user && (await user.matchPassword(password))) {
      sendTokenCookie(res, user);

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      res.status(401);
      return next(new Error("Invalid email or password"));
    }
  } catch (error) {
    next(error);
  }
};

// @desc Logout User / Clear Cookie
exports.logoutUser = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0), // Set to epoch to delete immediately
    sameSite: "Lax",
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200).json({ message: "Logged out successfully" });
};
