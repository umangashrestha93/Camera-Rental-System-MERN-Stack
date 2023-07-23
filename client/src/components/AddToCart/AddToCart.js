import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";

import "./AddToCart.css"

const AddToCart = () => {
  const [cart, setCart] = useState('');
  const getCartURL = "http://localhost:8000/api/cart/getCart";
  const cookies = new Cookies();
  const token = cookies.get("token");
  const headers = {
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
  };

  const getCart = async () => {
    if (token) {
      try {
        const response = await axios.get(getCartURL, { headers });
        setCart(response.data.data)
        return response
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/cart/${id}`, { headers })
      getCart();
      return response
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className='my-20 blog-out'>
      {!!cart ? (
        <div className='container-empty-cart'>
          <div className="flex justify-between mb-4">
            <h3 className="text-4xl font-semibold">Cart Info</h3>
            <Link to="/checkout">
              <button className="px-4 py-2 text-white bg-teal-500">
                Checkout
              </button>
            </Link>
          </div>

          <Table striped bordered>
            <thead>
              <tr>
                <th>SN</th>
                <th>Product name</th>
                <th>Image</th>
                <th>Price/day</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {!!Object.keys(cart).length && cart.product.map((item, index) => {
                return (
                  <tr key={item.productId}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td className="flex justify-center product_img">
                      <img src={`http://localhost:8000/${item.cover}`} alt="img" />
                    </td>
                    <td>Rs.{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>
                      <button className="px-2 py-1 m-0 bg-white" onClick={() => handleDelete(item.productId)}>
                        <i className="m-0 fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                )
              })}
              <tr>
                <td></td>
                <td colSpan={2}>Grand Total</td>
                <td colSpan={3}>Rs.{cart.totalPrice}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      ) : (
        <div className='container-empty-cart'>
          <h1><span className="mr-4 fa fa-shopping-cart" ></span>Your shopping cart is currently empty.</h1>
          <p>
            Start adding items to your cart by browsing our products
            <a href="/camera"><i>"Camera</i></a>, <a href="/gears"><i>Gears"</i></a>
          </p>
          <button className="empty-cart-button">
            <a href='/gears'>Continue Shopping</a>
          </button>
        </div>
      )
      }

    </section>
  );
};

export default AddToCart;
