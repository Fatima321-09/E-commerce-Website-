const express = require("express");
const router = express.Router();
const {
  registerUser,
  authUser,
  logoutUser,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

// @desc Register a new user
// This matches: POST http://localhost:5000/api/users/register
router.post("/register", registerUser);

// @desc Authenticate user & get token (Login)
// This matches: POST http://localhost:5000/api/users/login
router.post("/login", authUser);

// @desc Logout user / clear cookie
router.post("/logout", logoutUser);

// @desc Get user profile (The Handshake)
router.get("/profile", protect, (req, res) => {
  if (req.user) {
    res.json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

module.exports = router;
