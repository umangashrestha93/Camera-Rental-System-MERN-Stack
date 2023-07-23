import React, { useState, useEffect } from 'react'

import { getOrders } from '../../services/api/utils';

export function List() {
    const [orders, setOrders] = useState([]);

    const fetchAndSetOrders = async () => {
        const res = await getOrders();
        if (res.status === 200) {
            const data = res?.data?.data;
            setOrders(data);
        }
        return res;
    };

    useEffect(() => {
        fetchAndSetOrders()
    }, [])

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">Orders Management</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the organization with their full details.
                    </p>
                </div>
            </div>

            <div className="flow-root mt-8">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                        User
                                    </th>
                                    <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                                        Products
                                    </th>
                                    <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                                        Phone
                                    </th>
                                    <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                                        Total Amount
                                    </th>
                                    <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                                        Address
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200">
                                {!!Object.keys(orders).length && orders.map((order) => {
                                    return (
                                        <tr key={order._id}>
                                            <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-0">
                                                {order.user.email}
                                            </td>
                                            <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {order.product.map((pro) => {
                                                    return (
                                                        <span key={pro._id}>
                                                            {pro.name}, {pro.location}, {pro.type}
                                                        </span>
                                                    )
                                                }
                                                )}
                                            </td>
                                            <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{order.phoneNumber}</td>
                                            <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{order.totalPrice}</td>
                                            <td className="relative py-4 pl-3 pr-4 text-sm text-gray-500 whitespace-nowrap sm:pr-0">
                                                {order.address}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}