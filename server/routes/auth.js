const express = require("express");
const { login, register, logout, getMe, updatePassword, updatedetails } = require("../controllers/auth.js");
const router = express.Router();

// Protect Middleware
const { protect } = require("../middlewares/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", protect, getMe);

router.put("/updatedetails", protect, updatedetails);

router.put("/updatepassword", protect, updatePassword);

module.exports = router;
