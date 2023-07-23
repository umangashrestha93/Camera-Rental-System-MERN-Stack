import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "../common/header/Header";
import Home from "../home/Home";
import Footer from "../common/footer/Footer";
import About from "../about/About";
import Camera from "../Camera/Camera";
import Services from "../services/Services";
import Contact from "../contact/Contact";
import Login from "../login/Login";
import Signup from "../signup/signup";
import Photographers from "../home/Photographers/Photographers";
import Gears from "../../components/home/gears/Gears";
import AddToCart from "../AddToCart/AddToCart";
import CartCard from "../AddToCart/CartCard";
import { Checkout } from "../checkoutform/Checkout";
import { Profile } from "../profile/Profile";

const Pages = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/services" element={<Services />} />
          <Route exact path="/camera" element={<Camera />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/photographer" element={<Photographers />} />
          <Route exact path="/gears" element={<Gears />} />
          <Route exact path="/cart" element={<AddToCart />} />
          <Route exact path="/cartcard" element={<CartCard />} />
          <Route exact path="/checkout" element={<Checkout />} />
          <Route exact path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default Pages;
