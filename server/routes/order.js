const express = require("express");
const {getAllOrders, getUsersOrder, getSingleOrder ,saveOrder } = require("../controllers/order.js");
const router = express.Router();

// Protect Middleware
const { protect } = require("../middlewares/auth");

router.get("/", protect, getAllOrders);

router.get("/user-order/:id", protect, getUsersOrder);

router.get("/:id", protect, getSingleOrder);

router.post("/checkout", protect, saveOrder);

module.exports = router; 