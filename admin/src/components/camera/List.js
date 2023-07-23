import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

import { deleteCamera, getCameras } from '../../services/api/utils';

export function List() {
  const [cameras, setCameras] = useState([]);
  const navigate = useNavigate();

  const fetchAndSetCameras = async () => {
    const res = await getCameras();

    if (res.status === 200) {
      const data = res?.data;
      setCameras(data.data);
    }

    return res;
  };

  useEffect(() => {
    fetchAndSetCameras()
  }, [])

  const handleDelete = async (id) => {
    await deleteCamera(id);
    return fetchAndSetCameras();
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Camera/Gear Management</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the camera and gears.
          </p>
        </div>

        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={() => navigate("/camera/form")}
            className="block px-3 py-2 text-sm font-semibold text-center text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add Item
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
                    Name
                  </th>
                  <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                    Category
                  </th>
                  <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                    Type
                  </th>
                  <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                    Location
                  </th>
                  <th scope="col" className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900">
                    Price per day
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0 text-sm text-right font-semibold text-gray-900">
                    <span className="sr-only">Edit</span>
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {!!Object.keys(cameras).length && cameras.map((camera) => {
                  return (
                    <tr key={camera._id}>
                      <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-0">
                        {camera.name}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 capitalize whitespace-nowrap">{camera.category}</td>
                      <td className="px-3 py-4 text-sm text-gray-500 capitalize whitespace-nowrap">{camera.cameraType}</td>
                      <td className="px-3 py-4 text-sm text-gray-500 capitalize whitespace-nowrap">{camera.location}</td>
                      <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{camera.price}</td>
                      <td className="relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-0">
                        <button
                          type="button"
                          title='Edit'
                          onClick={() => navigate(`/camera/edit/${camera._id}`)}
                          className="p-1 mr-4 text-indigo-600 rounded-full hover:bg-gray-200"
                        >
                          <PencilSquareIcon className='w-5 h-5' />
                          <span className="sr-only">, {camera.name}</span>
                        </button>

                        <button
                          type="button"
                          title='Delete'
                          onClick={() => handleDelete(`${camera._id}`)}
                          className="p-1 text-red-600 rounded-full hover:bg-gray-200"
                        >
                          <TrashIcon className='w-5 h-5' />
                          <span className="sr-only">, {camera.name}</span>
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