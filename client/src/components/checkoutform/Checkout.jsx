import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Cookies from "universal-cookie";

import PopUpToast from "../common/Toast";
import Khalti from "../Khalti/Khalti";
import "./checkout.scss";

export const Checkout = () => {
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState("");
  const [formData, setFormData] = useState({
    cartId: "",
    email: "",
    fullName: "",
    phoneNumber: "",
    address: "",
  });
  const getCartURL = "http://localhost:8000/api/cart/getCart";
  const cookies = new Cookies();
  const token = cookies.get("token");
  const headers = {
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      cartId: cart._id,
    });
  };

  const getCart = async () => {
    if (token) {
      try {
        const response = await axios.get(getCartURL, { headers });
        setCart(response.data.data);
        return response;
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/order/checkout",
        formData,
        { headers }
      );
      getCart();
      setOpen(true);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <PopUpToast
        open={open}
        setOpen={setOpen}
        title="Order Placed Successfully!!"
        message="Your order has been placed successfully. We will get to you soon!"
      />

      {!!cart ? (
        <>
          <h1 className="my-5 text-4xl font-semibold text-center">
            Place Your Order
          </h1>

          <div className="container flex flex-col items-start gap-12 p-10 mb-10 border rounded-xl lg:flex-row">
            <div className="w-full lg:w-8/12 cart_info">
              <h3 className="mb-4 text-2xl font-semibold">Cart Info</h3>

              <Table striped bordered hover className="cart-table">
                <thead>
                  <tr>
                    <th>SN</th>
                    <th>Product name</th>
                    <th>Image</th>
                    <th>Price/day</th>
                    <th className="text-center">Quantity</th>
                  </tr>
                </thead>

                <tbody>
                  {!!Object.keys(cart).length &&
                    cart.product.map((item, index) => {
                      return (
                        <tr key={item.productId}>
                          <td>{index + 1}</td>
                          <td>{item.name}</td>
                          <td className="product_img">
                            <img src={`http://localhost:8000/${item.cover}`} alt="img" />
                          </td>
                          <td>Rs. {item.price}</td>
                          <td className="text-center">{item.quantity}</td>
                        </tr>
                      );
                    })
                  }

                  <tr>
                    <td></td>
                    <td colSpan={2}>Grand Total</td>
                    <td colSpan={3}>Rs.{cart.totalPrice}</td>
                  </tr>
                </tbody>
              </Table>
            </div>

            <form className="p-0 m-0 lg:w-4/12 checkout_form">
              <h3 className="mb-4 text-2xl font-semibold">Checkout Form</h3>

              <div className="flex gap-8 mb-4">
                <div className="w-50">
                  <label>Full name</label>
                  <input
                    type="text"
                    name="fullName"
                    onChange={handleChange}
                    className="border rounded-md"
                  />
                </div>

                <div className="w-50">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    className="border rounded-md"
                  />
                </div>
              </div>

              <div className="flex gap-8">
                <div className="w-50">
                  <label>Phone Number</label>
                  <input
                    type="number"
                    name="phoneNumber"
                    onChange={handleChange}
                    className="border rounded-md"
                  />
                </div>

                <div className="w-50">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    onChange={handleChange}
                    className="border rounded-md"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-6 mt-6">
                <Khalti
                  totalAmount={cart.totalPrice}
                  handleSubmit={handleSubmit}
                  productName={cart.totalPrice}
                  productIdentity={cart.totalPrice}
                />
              </div>
            </form>
          </div>
        </>
      ) : (
        <div className="container checkout_container">
          <div className="lg:w-6/12 cart_info">
            <h3 className="mb-4 text-2xl font-semibold">
              Your cart is empty !!
            </h3>
            <p>Please add products to your cart and come back to this page.</p>
          </div>

          <form className="lg:w-6/12 checkout_form" onSubmit={handleSubmit}>
            <h3 className="mb-0">Checkout Form</h3>
            <div className="flex gap-10">
              <div className="w-50">
                <label>Full name</label>
                <input
                  type="text"
                  name="fullName"
                  className="border rounded-md"
                  onChange={handleChange}
                />
              </div>

              <div className="w-50">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className="border rounded-md"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex gap-10">
              <div className="w-50">
                <label>Phone Number</label>
                <input
                  type="number"
                  name="phoneNumber"
                  className="border rounded-md"
                  onChange={handleChange}
                />
              </div>

              <div className="w-50">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  className="border rounded-md"
                  onChange={handleChange}
                />
              </div>
            </div>

            <button
              className="px-4 py-2 mt-3 ml-auto bg-teal-500 border border-gray-300 text-gray-50 hover:bg-teal-600"
              type="submit"
            >
              Checkout
            </button>
          </form>
        </div>
      )}
    </>
  );
};
