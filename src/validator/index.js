const validatePayload = (schema, payload) => {
  const { value, error } = schema.validate(payload);
  if (error) {
    return {
      err: error.details,
      data: null,
    };
  }
  return {
    err: null,
    data: value,
  };
};

module.exports = {
  validatePayload,
};
