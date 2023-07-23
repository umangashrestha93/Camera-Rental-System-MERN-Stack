import React, { useEffect } from 'react'
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup";

import Spinner from '../ui/Spinner';
import { ImageDropper } from '../ui/ImageDropper';
import { emptyDefaultValues, setFormValues, validationSchema } from './utils'

export const CameraForm = ({ defaultValues = emptyDefaultValues, onSave = () => { } }) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const {
    fields: cover,
    append: appendCovers,
    remove: removeCovers,
  } = useFieldArray({
    control,
    name: "cover",
  });

  const onSubmit = async (payload) => {
    try {
      navigate('/camera')
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
                Item
              </h3>
              <p className="max-w-2xl mt-1 text-sm text-gray-500">
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </div>
            <div className="space-y-6 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                >
                  Name
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <div className="flex max-w-lg rounded-md shadow-sm">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      autoComplete="name"
                      {...register("name")}
                      className="block w-full min-w-0 flex-1 rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {errors?.name && (
                    <p className="my-3 text-sm text-rose-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
          <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
            Category
          </label>
          <div className="mt-2 sm:col-span-2 sm:mt-0">
            <select
              id="category"
              name="category"
              autoComplete="category"
              {...register("category")}
              className="block w-full max-w-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option></option>
              <option value="Rent">Rent</option>
              <option value="Sale">Sale</option>
            </select>
            {errors?.category && (
              <p className='my-3 text-sm text-rose-500'>
                {errors.category.message}
              </p>
            )}
          </div>
        </div>

        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
          <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
            Price per day
          </label>
          <div className="mt-2 sm:col-span-2 sm:mt-0">
            <div className="flex max-w-lg rounded-md shadow-sm">
              <input
                type="text"
                name="price"
                id="price"
                autoComplete="price"
                {...register("price")}
                className="block w-full min-w-0 flex-1 rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            {errors?.price && (
              <p className='my-3 text-sm text-rose-500'>
                {errors.price.message}
              </p>
            )}
          </div>
        </div>

        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
          <label htmlFor="cameraType" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
            Type
          </label>
          <div className="mt-2 sm:col-span-2 sm:mt-0">
            <select
              id="cameraType"
              name="cameraType"
              autoComplete="cameraType"
              {...register("cameraType")}
              className="block w-full max-w-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option></option>
              <option value="camera">Camera</option>
              <option value="gears">Gears</option>
            </select>
            {errors?.cameraType && (
              <p className='my-3 text-sm text-rose-500'>
                {errors.cameraType.message}
              </p>
            )}
          </div>
        </div>

        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
          <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
            Location
          </label>
          <div className="mt-2 sm:col-span-2 sm:mt-0">
            <input
              type="text"
              name="location"
              id="location"
              autoComplete="location"
              {...register("location")}
              className="block w-full max-w-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors?.location && (
              <p className='my-3 text-sm text-rose-500'>
                {errors.location.message}
              </p>
            )}
          </div>
        </div>

        <ImageDropper cover={cover} appendCovers={appendCovers} removeCovers={removeCovers} errors={errors} />

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
              {isSubmitting ? <Spinner /> : "Save"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};