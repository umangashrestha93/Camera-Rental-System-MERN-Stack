import React from "react";
import img from "../images/pricing.jpg";
import Back from "../common/Back";
import "./contact.css";

const Contact = () => {
  return (
    <>
      <section className="contact mb">
        <Back
          name="Contact Us"
          title="Get Helps & Friendly Support"
          cover={img}
        />
        <div className="container">
          <form className="max-w-4xl mx-auto shadow">
            <h4 className="mb-6 text-3xl">Contact us by filling up the form for more details</h4>
            <div>
              <input
                type="text"
                placeholder="Name"
                className="text-sm border rounded-lg"
              />
              <input
                type="text"
                placeholder="Email"
                className="text-sm border rounded-lg"
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              className="text-sm border rounded-lg"
            />
            <textarea cols="30" rows="10"></textarea>
            <button className="px-4 py-2.5 bg-teal-500 text-white">
              Submit Request
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;
