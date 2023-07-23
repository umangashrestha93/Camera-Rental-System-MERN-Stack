import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

import "./login.css";

function Login() {
  const navigate = useNavigate()
  const cookies = new Cookies();
  const url = "http://localhost:8000/api/auth/login";
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(url, formData);
      cookies.set('token', response.data.token)
      navigate("/")
      window.location.reload()
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1 className="text-4xl capitalize title">Login to your account</h1>
      <form onSubmit={handleSubmit} className="w-full sm:max-w-md login_form">
        <label className="form_label" htmlFor="email">
          Email:
          <input
            type="email"
            id="email"
            name="email"
            className="border rounded-lg input_field"
            onChange={handleChange}
          />
        </label>

        <label className="form_label" htmlFor="password">
          Password:
          <input
            type="password"
            id="password"
            name="password"
            className="border rounded-lg input_field"
            onChange={handleChange}
          />
        </label>

        <button type="submit" className="text-white bg-teal-500 login_btn hover:bg-teal-600">
          Log In
        </button>
      </form>
    </>
  );
}

export default Login;
