const Cart = require("../models/Cart");
const User = require("../models/User");

exports.addToCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId, "name email");

    // Assuming that the product data obtained from the frontend is stored in a variable called "productData"
    console.log(req.body);
    const { productId, cover, name, location, category, price, type } =
      req.body;

    // Find the cart for the current user
    let cart = await Cart.findOne({ "user._id": userId });

    if (!cart) {
      cart = new Cart({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
        product: [],
        quantity: 0,
        totalPrice: 0,
      });
    }

    const productIndex = cart.product.findIndex(
      (p) => p.id.toString() === productId
    );

    console.log(productIndex, "productIndexproductIndex");

    if (cart.product.some((p) => p.productId == productId)) {
      // If product is already in the cart, increment its quantity
      cart.product.forEach((p) => {
        if (p.productId == productId) {
          console.log("I am here");
          qty = p.quantity;
          p.quantity = qty + 1;
        }
      });
    } else {
      // If product is not in the cart, add it to the cart
      cart.product.push({
        productId,
        cover,
        name,
        location,
        category,
        price,
        type,
        quantity: 1,
        totalPrice: price,
      });
    }

    // Update the quantity and total price of the cart
    cart.quantity += 1;
    cart.totalPrice += price;

    // Save the cart to the database
    await cart.save();

    res.status(201).json({ success: true, data: cart });
  } catch (err) {
    next(err);
  }
};

exports.getCartByUsers = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ "user._id": userId });
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    next(error);
  }
};

exports.deleteProductFromCart = async (req, res, next) => {
  const productId = req.params.id;
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ "user._id": userId });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    const product = cart.product.find(
      (p) => (p.productId).toString() === (productId).toString()
    );

    if (product) {
      const price = product.quantity * product.price;
      const updatedCart = await Cart.updateOne(
        { "user._id": userId },
        {
          $pull: { product: { productId } },
          //   $inc: { totalAmount: -price },
          $set: { totalPrice: cart.totalPrice - price },
        }
      );
      res.status(200).json({
        success: true,
        message: "Product removed from cart",
        data: updatedCart,
      });
    } else {
      return res.status(404).json({ success: false, message: "Failed" });
    }
  } catch (error) {
    next(error);
  }
};