import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import {
    XMarkIcon,
    CameraIcon,
    ShoppingCartIcon,
    UserGroupIcon
} from "@heroicons/react/24/outline";

const navigation = [
    {
        name: "Camera",
        href: "/camera",
        icon: CameraIcon,
    },
    {

        name: "Orders",
        href: "/orders",
        icon: ShoppingCartIcon,
    },
    {
        name: "Users",
        href: "/users",
        icon: UserGroupIcon,
    },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export const SideBar = ({ sidebarOpen, setSidebarOpen }) => {

    return (
        <div>
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-40 lg:hidden"
                    onClose={setSidebarOpen}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-40 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-gray-800">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="absolute top-0 right-0 pt-2 -mr-12">
                                        <button
                                            type="button"
                                            className="flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                            onClick={() => setSidebarOpen(false)}
                                        >
                                            <span className="sr-only">Close sidebar</span>
                                            <XMarkIcon
                                                className="w-6 h-6 text-white"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </div>
                                </Transition.Child>
                                <div className="flex items-center flex-shrink-0 px-4">
                                    <img
                                        className="w-auto h-8"
                                        src="/logo.png"
                                        alt="Your Company"
                                    />
                                </div>
                                <div className="flex-1 h-0 mt-5 overflow-y-auto">
                                    <nav className="px-2 space-y-1">
                                        <div className="mb-4 space-y-1">
                                            {navigation.map((item) => (
                                                <NavLink
                                                    to={item.href}
                                                    key={item.name}
                                                    href={item.href}
                                                    className={classNames(
                                                        item.current
                                                            ? "bg-gray-900 text-white"
                                                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                                        "group flex items-center rounded-md px-2 py-2 text-sm font-medium"
                                                    )}
                                                >
                                                    <item.icon
                                                        className={classNames(
                                                            item.current
                                                                ? "text-gray-300"
                                                                : "text-gray-400 group-hover:text-gray-300",
                                                            "mr-3 h-6 w-6 flex-shrink-0"
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                    {item.name}
                                                </NavLink>
                                            ))}
                                        </div>
                                    </nav>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                        <div className="flex-shrink-0 w-14" aria-hidden="true"></div>
                    </div>
                </Dialog>
            </Transition.Root>

            <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
                <div className="flex flex-col flex-1 min-h-0 bg-gray-800">
                    <div className="flex items-center flex-shrink-0 h-16 px-4 bg-gray-900">
                        <img
                            className="w-auto h-8"
                            src="/logo.png"
                            alt="Your Company"
                        />
                    </div>

                    <div className="flex flex-col flex-1 overflow-y-auto">
                        <nav className="flex-1 px-2 py-4 space-y-1">
                            <div className="mb-4 space-y-1">
                                {navigation.map((item) => (
                                    <NavLink
                                        to={item.href}
                                        key={item.name}
                                        href={item.href}
                                        className={classNames(
                                            item.current
                                                ? "bg-gray-900 text-white"
                                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                            "group flex items-center rounded-md px-2 py-2 text-sm font-medium"
                                        )}
                                    >
                                        <item.icon
                                            className={classNames(
                                                item.current
                                                    ? "text-gray-300"
                                                    : "text-gray-400 group-hover:text-gray-300",
                                                "mr-3 h-6 w-6 flex-shrink-0"
                                            )}
                                            aria-hidden="true"
                                        />
                                        {item.name}
                                    </NavLink>
                                ))}
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};
