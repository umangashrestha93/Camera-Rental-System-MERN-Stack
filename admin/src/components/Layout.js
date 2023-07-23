import React, { Fragment, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import {
  Bars3BottomLeftIcon,
} from "@heroicons/react/24/outline";

import { handleLogOut } from '../services/api/utils';
import { SideBar } from "./Sidebar"

export const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      const res = await handleLogOut();
      if (res.status === 200) {
        navigate("/login");
        return res
      }
      return res;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex flex-col lg:pl-64">
        <div className="sticky top-0 z-10 flex flex-shrink-0 h-16 bg-white shadow">
          <button
            type="button"
            className="px-4 text-gray-500 border-r border-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3BottomLeftIcon className="w-6 h-6" aria-hidden="true" />
          </button>

          <div className="flex justify-between flex-1 px-4">
            <div className="flex flex-1">{/*Blank Space*/}</div>
            <div className="flex items-center ml-4 lg:ml-6">
              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <div>
                  <Menu.Button className="flex items-center max-w-xs text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <span className="sr-only">Open user menu</span>
                    <span className="flex items-center justify-center w-10 h-10 text-lg font-bold text-gray-600 bg-gray-200 rounded-full hover:bg-gray-300">
                      A
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
                        onClick={onLogout}
                        className="block w-full px-4 py-2 text-sm text-left text-gray-700"
                      >
                        Log out
                      </button>
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>

        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
