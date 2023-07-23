const express = require("express");
const { addToCart, getCartByUsers, deleteProductFromCart } = require("../controllers/cart");

const router = express.Router();

// Protect Middleware
const { protect, authorize } = require("../middlewares/auth");

router.post("/addToCart", protect, addToCart);
router.get("/getCart", protect, getCartByUsers);
router.delete("/:id", protect, deleteProductFromCart); 

// router.post("/login", login);

module.exports = router;
