const Cart = require("../models/Cart");
const Order = require("../models/Order");
const User = require("../models/User");

exports.saveOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId, "name email");

    // Assuming that the product data obtained from the frontend is stored in a variable called "productData"
    const { cartId, fulllName, email, phoneNumber, address } = req.body;

    // Find the cart for the current user
    const cart = await Cart.findById(cartId);

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    const product = cart.product;

    const quantity = cart.quantity;

    const totalPrice = cart.totalPrice;

    // Create a new order instance
    const order = new Order({
      user: {
        _id: userId,
        name: user.name,
        email: user.email,
      },
      fulllName,
      email,
      phoneNumber,
      address,
      product,
      quantity,
      totalPrice,
    });

    // Save the order to the database
    const savedOrder = await order.save();

    // Remove the cart from the database
    await Cart.findByIdAndRemove(cartId);

    res.status(201).json({ success: true, data: savedOrder });
  } catch (err) {
    next(err);
  }
};

exports.getAllOrders = async (req, res, next) => {
  try {
    
    const orders = await Order.find()

    // if (!orders) {
    //   return res
    //     .status(404)
    //     .json({ success: false, message: "Orders  not found" });
    // }

    res.status(200).json({ success: true, data: orders }); 


  } catch (error) {
    next(error)
  }
}

exports.getUsersOrder = async (req, res, next) => {
  try {
    // const userId = req.user.id;

    const orders = await Order.find({ "user._id": req.params.id });

    if (!orders) {
      return res.status(400).json({
        success: false,
        message: "No Orders available of the provided User",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

exports.getSingleOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(400).json({
        success: false,
        message: "No Order available with the provided id",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    next(error);
  }
};