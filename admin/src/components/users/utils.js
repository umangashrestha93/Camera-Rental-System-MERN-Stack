
export const emptyDefaultValues = {
  username: "",
  email: "",
  password: "",
  role: "",
};

export const normalizeUserEditPayload = (user) => {
  const data = {
    username: user.username,
    email: user.email
  };

  return data;
};

export const setFormValues = (defaultValues, setValue) => {
  Object.keys(defaultValues).forEach(key => {
    setValue(key, defaultValues[key]);
  });
};
