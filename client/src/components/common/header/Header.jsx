import React, { useState, Fragment } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { Menu, Transition } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";

import { UserIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";

import { nav } from "../../data/Data";
import "./header.scss";

const Header = () => {
  const navigate = useNavigate();
  const [navList, setNavList] = useState(false);
  const cookies = new Cookies();
  const [token, setToken] = useState(cookies.get("token"));

  const url = "http://localhost:8000/api/auth/logout";

  const handleLogOut = async () => {
    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        cookies.remove("token");
        navigate("/");
        window.location.reload();
        setToken(cookies.get("token"));
        return response;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <header className="bg-white">
        <div className="container relative flex justify-between py-3">
          <Link to="/" className="items-center justify-center logo d-flex">
            <img src="../images/logo2.png" alt="shutterScope" className="" />
          </Link>

          <ul
            className={`m-0 absolute xl:translate-x-1/2 xl:-translate-y-1/2 xl:top-2/4 xl:right-2/4 xl:gap-6 hidden xl:flex ${
              navList ? "small" : "isFlex"
            }`}
          >
            {nav.map((list, index) => (
              <Link
                key={index}
                to={list.path}
                onClick={() => setNavList(false)}
              >
                {list.text}
              </Link>
            ))}
          </ul>

          <div className="flex items-center gap-8">
            <Link
              to="/cart"
              className="flex items-center justify-center p-2.5 text-gray-600 bg-gray-200 rounded-full hover:text-gray-600 hover:bg-gray-300"
              title="Cart"
            >
              <ShoppingCartIcon className="w-6 h-6" />
            </Link>

            {!!token ? (
              <ul className="">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <Menu as="div" className="relative">
                      <div>
                        <Menu.Button className="flex items-center max-w-xs text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                          <span className="sr-only">Open user menu</span>
                          <span className="flex items-center justify-center w-10 h-10 text-lg font-bold text-gray-600 bg-gray-200 rounded-full hover:bg-gray-300">
                            <UserIcon className="w-6 h-6" />
                          </span>
                        </Menu.Button>
                      </div>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            <button
                              onClick={() => navigate("/profile")}
                              className="block w-full px-4 py-2.5 text-sm text-left text-gray-700 hover:bg-gray-100"
                            >
                              Profile
                            </button>
                          </Menu.Item>
                          <Menu.Item>
                            <button
                              onClick={handleLogOut}
                              className="block w-full px-4 py-2.5 text-sm text-left text-gray-700 hover:bg-gray-100"
                            >
                              Log out
                            </button>
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </ul>
            ) : (
              ""
            )}

            <ul className="xl:hidden">
              <div className="flex justify-between">
                <div className="flex items-center">
                  <Menu as="div" className="relative">
                    <div>
                      <Menu.Button className="flex items-center max-w-xs text-sm bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        <span className="sr-only">Open user menu</span>
                        <span className="flex items-center justify-center w-10 h-10 text-lg font-bold text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300">
                          <Bars3Icon className="w-7 h-7" />
                        </span>
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 w-64 px-4 py-3 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {nav.map((list, index) => (
                          <Menu.Item>
                            <Link
                              key={index}
                              to={list.path}
                              className="block w-full px-4 py-2.5 mb-3 text-sm text-center rounded-lg text-gray-700 capitalize hover:bg-gray-200 hover:no-underline hover:text-gray-600"
                            >
                              {list.text}
                            </Link>
                          </Menu.Item>
                        ))}

                        {!!token ? (
                          ""
                        ) : (
                          <>
                            <Menu.Item>
                              <button
                                onClick={()=> navigate("/signup")}
                                className="px-4 py-2.5 w-full bg-gray-100 text-black border border-gray-800 hover:bg-gray-200 text-sm mb-3"
                              >
                                <i className="fa fa-user"></i> Create an Account
                              </button>
                            </Menu.Item>
                            <Menu.Item>
                              <button
                                onClick={()=> navigate("/login")}
                                className="px-4 py-2.5 w-full bg-teal-500 text-white hover:bg-teal-600 text-sm"
                              >
                                Log In
                              </button>
                            </Menu.Item>
                          </>
                        )}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </ul>

            {!!token ? (
             ''
            ) : (
              <div className="hidden gap-4 xl:flex">
                <a href="/login">
                  <button className="px-4 py-2.5 bg-teal-500 text-white hover:bg-teal-600 text-md">
                    <i className="fa fa-sign-out"></i>
                    Log in
                  </button>
                </a>

                <a href="/signup">
                  <button className="px-4 py-2.5 bg-gray-100 text-black border border-gray-800 hover:bg-gray-200 text-md">
                    <i className="fa fa-user"></i> Create an account
                  </button>
                </a>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
