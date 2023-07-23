const axios = require("axios");
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth.js");
const usersRoute = require("./routes/users.js");
const cart = require("./routes/cart.js");
const order = require("./routes/order.js");
const camera = require("./routes/camera.js");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
dotenv.config();

const connect = async () => {
  try {
    mongoose;
    await mongoose.connect(process.env.MONGO);
    console.log("Connnected to mongoDB");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected");
});

//middelware
// parse application/json
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

// Make folder public
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/cart", cart);
app.use("/api/order", order);
app.use("/api/camera", camera);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.post("/api/verify-payment", async (req, res) => {

  const data = {
    "token": req.body.token,
    "amount": req.body.amount
  };

  let config = {
    headers: { 'Authorization': 'Key test_secret_key_a31f33ceff544306ad7dadfbeb8d0519' }
  };

  axios.post("https://khalti.com/api/v2/payment/verify/", data, config)
    .then(response => {
      res.status(200).json({ success: true, data: response.data })
    })
    .catch(error => {
      console.log(error);
    });

});

app.listen(8000, () => {
  connect();
  console.log("Connected to Back-End @8000");
});
