import * as yup from "yup";

export const emptyDefaultValues = {
  cover: [],
  name: "",
  category: "",
  price: "",
  cameraType: "",
  location: "",
};

export const validationSchema = yup.object({
  cover: yup
    .array()
    .min(1, "Image is required.")
    .max(1, "Please limit the Image number to one "),
  name: yup
    .string()
    .required('Name is required.')
    .min(3, 'Must be more than 3 characters.'),
  category: yup
    .string()
    .required("Category is required."),
  price: yup
    .number()
    .required('Price is required'),
  cameraType: yup
    .string()
    .required('Type is required.'),
  location: yup.string().required("Address is required."),
});

export const normalizeCamera = (camera) => {
  const data = { ...camera };

  Object.keys(data).forEach((key) => {
    if (key === "cover") {
      delete data[key];
    }
  });

  return data;
};

export const setFormValues = (defaultValues, setValue) => {
  Object.keys(defaultValues).forEach((key) => {
    setValue(key, defaultValues[key])
    const { cover } = defaultValues;
    setValue("cover", Array.isArray(cover) ? [...cover] : [cover]);
  })
};
