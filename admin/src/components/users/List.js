import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

import { deleteUser, getAllUsers } from '../../services/api/utils';

export function List() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchAndSetUsers = async () => {
    const res = await getAllUsers();
    if (res.status === 200) {
      const data = res?.data;
      setUsers(data);
    }
    return res;
  };

  useEffect(() => {
    fetchAndSetUsers()
  }, [])

  const handleDelete = async (id) => {
    await deleteUser(id);
    return fetchAndSetUsers();
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">User Management</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the users with their full details.
          </p>
        </div>

        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={() => navigate("/users/form")}
            className="block px-3 py-2 text-sm font-semibold text-center text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add User
          </button>
        </div>
      </div>

      <div className="flow-root mt-8">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Id
                  </th>
                  <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                    User Name
                  </th>
                  <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                    Email
                  </th>
                  <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                    Role
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0 text-sm text-right font-semibold text-gray-900">
                    <span className="sr-only">Edit</span>
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {!!Object.keys(users).length && users.map((user) => {
                  return (
                    <tr key={user._id}>
                      <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-0">
                        {user._id}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{user.username}</td>
                      <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{user.email}</td>
                      <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{user.role}</td>
                      <td className="relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-0">
                        <button
                          type="button"
                          title='Edit'
                          onClick={() => navigate(`/user/edit/${user._id}`)}
                          className="p-1 mr-4 text-indigo-600 rounded-full hover:bg-gray-200"
                        >
                          <PencilSquareIcon className='w-5 h-5' />
                        </button>

                        <button
                          type="button"
                          title='Delete'
                          onClick={() => handleDelete(`${user._id}`)}
                          className="p-1 text-red-600 rounded-full hover:bg-gray-200"
                        >
                          <TrashIcon className='w-5 h-5' />
                        </button>
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