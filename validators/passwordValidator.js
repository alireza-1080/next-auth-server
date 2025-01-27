import joi from 'joi';

const passwordValidatorSchema = joi.object({
  password: joi.string().min(5).required().messages({
    'string.min': 'The password must be at least 5 characters long.',
    'any.required': 'The password field is required.',
  }),
});

const passwordValidator = (password) => {
  const { error, value } = passwordValidatorSchema.validate({ password });
  if (error) {
    throw new Error(error.details[0].message);
  }
  return value.password;
};

export default passwordValidator;
