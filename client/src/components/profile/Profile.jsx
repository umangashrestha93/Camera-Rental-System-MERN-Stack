import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import PopUpToast from "../common/Toast";
import {
  getProfile,
  normalizeProfile,
  updatePassword,
  updateProfile,
} from "./utils";

export const Profile = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    username: "",
    email: "",
    role: "",
  });
  const [passwordDetails, setPasswordDetails] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const navigate = useNavigate();

  const fetchAndSetData = async () => {
    const res = await getProfile();
    if (res.status === 200) {
      setData(normalizeProfile(res?.data?.data));
    }
    return res;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordDetails({
      ...passwordDetails,
      [name]: value,
    });
  };

  const updateProfileInfo = async (payload, image) => {
    const res = await updateProfile(payload);
    if (res.status === 200) {
      setOpen(true);
      return { res };
    }
    return { res };
  };

  const updateUserPassword = async (payload) => {
    const res = await updatePassword(payload);
    if (res.status === 200) {
      setOpen(true);
      return res;
    }
    return res;
  };

  useEffect(() => {
    fetchAndSetData();
  }, []);

  return (
    <>
      <PopUpToast
        open={open}
        setOpen={setOpen}
        title="Updated Successfully!!"
        message="Your profile has been updated successfully!!"
      />
      
      <div className="container flex flex-wrap items-start max-w-8xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            return updateProfileInfo(data);
          }}
          className="max-w-md px-6 py-8 mx-auto mb-12 border border-gray-100 rounded-2xl"
        >
          <h1 className="mb-10 text-3xl font-semibold text-center">
            Profile Information
          </h1>

          <div className="mb-3 sm:col-span-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              UserName
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  name="username"
                  id="username"
                  type="text"
                  value={data.username}
                  onChange={handleChange}
                  className="flex-1 block px-3 pt-1 pb-2 text-gray-900 bg-transparent border-0 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          <div className="mb-3 sm:col-span-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                value={data.email}
                type="email"
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="mb-4 sm:col-span-4">
            <label
              htmlFor="role"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Role
            </label>
            <div className="mt-2">
              <input
                id="role"
                value={data.role}
                name="role"
                type="text"
                onChange={handleChange}
                disabled
                className="block w-4/12 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="flex items-center justify-end mt-6 gap-x-6">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 border border-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-2 text-sm font-semibold text-white bg-teal-600 rounded-md shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            return updateUserPassword(passwordDetails);
          }}
          className="max-w-md px-6 py-8 mx-auto mb-12 border border-gray-100 rounded-2xl"
        >
          <h1 className="mb-10 text-3xl font-semibold text-center">
            Update Password
          </h1>

          <div className="mb-3 sm:col-span-4">
            <label
              htmlFor="currentPassword"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Current password
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  name="currentPassword"
                  id="currentPassword"
                  type="password"
                  onChange={handlePasswordChange}
                  className="flex-1 block px-3 pt-1 pb-2 text-gray-900 bg-transparent border-0 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          <div className="mb-3 sm:col-span-4">
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              New password
            </label>

            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  name="newPassword"
                  id="newPassword"
                  type="password"
                  onChange={handlePasswordChange}
                  className="flex-1 block px-3 pt-1 pb-2 text-gray-900 bg-transparent border-0 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end mt-6 gap-x-6">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 border border-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-2 text-sm font-semibold text-white bg-teal-600 rounded-md shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
