const validate = (obj, schema) => {
  const newErrors = {};

  const options = { abortEarly: false };
  const { error } = schema.validate(obj, options);
  if (error) {
    error.details.forEach((e) => {
      newErrors[e.path[0]] = e.message;
    });
  }

  return newErrors;
};

export { validate };
