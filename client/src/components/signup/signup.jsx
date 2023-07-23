import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PopUpToast from "../common/Toast";

const Signup = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const url = "http://localhost:8000/api/auth/register";
  const [formData, setFormData] = useState({
    username: "",
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
      navigate("/login");
      setOpen(true);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <PopUpToast
        open={open}
        setOpen={setOpen}
        title="Account Created Successfully!!"
        message="Your Account has been Created Successfully."
      />

      <h1 className="text-4xl title">Create a New Account</h1>
      <form onSubmit={handleSubmit} className="w-full signup_form sm:max-w-md ">
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="username"
            className="border rounded-lg"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="border rounded-lg"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="border rounded-lg"
            value={formData.password}
            onChange={handleChange}
            minLength={6}
            required
          />
        </div>
        <button type="submit" className="text-white bg-teal-500 signup_btn hover:bg-teal-600">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
