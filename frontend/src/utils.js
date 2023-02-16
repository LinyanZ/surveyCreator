const validate = (obj, schema, propertyName = null) => {
  const newErrors = {};

  const options = { abortEarly: false };
  const { error } = schema.validate(obj, options);
  if (error) {
    error.details.forEach((e) => {
      if (propertyName.includes(e.path[0])) newErrors[e.path[0]] = e.message;
    });
  }

  return newErrors;
};

export { validate };
