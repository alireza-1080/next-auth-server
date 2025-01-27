import joi from 'joi';

const emailValidatorSchema = joi.object({
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .required()
    .lowercase()
    .messages({
      'string.email': 'The email provided is not valid.',
      'any.required': 'The email field is required.',
    }),
});

const emailValidator = (email) => {
  const { error, value } = emailValidatorSchema.validate({ email });
  if (error) {
    throw new Error(error.details[0].message);
  }
  return value.email;
};

export default emailValidator;
