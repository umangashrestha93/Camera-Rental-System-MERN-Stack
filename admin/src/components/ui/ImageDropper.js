import React from 'react'
import Dropzone from "react-dropzone";
import {
    PhotoIcon, XMarkIcon
} from "@heroicons/react/24/outline";

export const ImageDropper = ({ cover, appendCovers, removeCovers, errors }) => {
    return (
        <Dropzone
            onDrop={(acceptedImages) => {
                const cover = acceptedImages[0];
                appendCovers(cover);
            }}
            multiple={false}
            accept='image/*'
        >
            {({ getRootProps, getInputProps }) => {
                return (
                    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                        <label htmlFor="image" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                            Cover photo
                        </label>
                        <div className="mt-2 sm:col-span-2 sm:mt-0">
                            <div className="flex max-w-lg rounded-md shadow-sm">
                                <div {...getRootProps()} className="flex justify-center w-full px-6 py-10 mt-2 border border-dashed rounded-lg border-gray-900/25 hover:border-gray-900/50">
                                    <input id="image" {...getInputProps()} />
                                    <div className="text-center">
                                        <PhotoIcon className="w-12 h-12 mx-auto text-gray-300" aria-hidden="true" />
                                        <span className="text-sm font-light">
                                            Upload a image or drag and drop
                                        </span>
                                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>
                            </div>

                            {errors?.image && (
                                <p className='my-3 text-sm text-rose-500'>
                                    {errors.image.message}
                                </p>
                            )}
                        </div>

                        <div />

                        <ul className="max-w-lg col-span-2 px-4 mt-4 mr-0 list-none bg-white divide-y divide-gray-200 rounded-md shadow sm:mt-0">
                            {cover.map((img, index) => {
                                return (
                                    <li
                                        key={`image-${index}`}
                                        className="flex flex-wrap items-center justify-between gap-4 py-4"
                                    >
                                        <div className="flex gap-1 items-top">
                                            <span className="mr-2 text-xl">
                                                <PhotoIcon height={20} />
                                            </span>

                                            <span className="text-sm break-all">
                                                {img?.originalname || img?.path || img?.name || img?.link || "Image"} 
                                            </span>
                                        </div>

                                        <button
                                            className="p-1 text-xl rounded-full hover:bg-gray-200"
                                            onClick={() => removeCovers(index)}
                                            type="button"
                                        >
                                            <XMarkIcon height={20} />
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )
            }}
        </Dropzone>
    )
}