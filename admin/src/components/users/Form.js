import React, { useEffect } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

import Spinner from '../ui/Spinner';
import { emptyDefaultValues, setFormValues } from './utils'

export const UsersForm = ({ defaultValues = emptyDefaultValues, onSave = () => { }, isUserEdit }) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting }
  } = useForm({
    defaultValues,
  });

  const onSubmit = async (payload) => {
    try {
      navigate('/users')
      return onSave(payload);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setFormValues(defaultValues, setValue)
  }, [defaultValues, setValue]);

  return (
    <div>
      <form
        className="px-8 space-y-8 divide-y divide-gray-200"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div className="space-y-6 sm:space-y-5">
            <div>
              <h3 className="text-base font-semibold leading-6 text-gray-900">
                User
              </h3>
              <p className="max-w-2xl mt-1 text-sm text-gray-500">
                This information is sensitive so please enter the inputs correctly.
              </p>
            </div>
            <div className="space-y-6 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                >
                  User Name
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <div className="flex max-w-lg rounded-md shadow-sm">
                    <input
                      type="text"
                      id="username"
                      name="username"
                      autoComplete="username"
                      {...register("username")}
                      className="block w-full min-w-0 flex-1 rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
            Email
          </label>
          <div className="mt-2 sm:col-span-2 sm:mt-0">
            <div className="flex max-w-lg rounded-md shadow-sm">
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                {...register("email")}
                className="block w-full min-w-0 flex-1 rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

          </div>
        </div>

        {
          isUserEdit ? ('') : (
            <>
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                  Password
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <div className="flex max-w-lg rounded-md shadow-sm">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      autoComplete="password"
                      {...register("password")}
                      className="block w-full min-w-0 flex-1 rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>

                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                  Role
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <select
                    id="role"
                    name="role"
                    autoComplete="role"
                    {...register("role")}
                    className="block w-full max-w-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option></option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>

                </div>
              </div>
            </>
          )
        }

        <div className="pt-5">
          <div className="flex justify-end gap-x-3">
            <button
              type="button"
              onClick={() => navigate('/organization')}
              className="px-3 py-2 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex justify-center px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isSubmitting ? <Spinner /> : "Add"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};