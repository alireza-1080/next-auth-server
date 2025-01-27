import joi from 'joi';

const nameValidatorSchema = joi.object({
  name: joi.string().min(3).required().messages({
    'string.min': 'The name must be at least 3 characters long.',
    'any.required': 'The name field is required.',
  }),
});

const nameValidator = (name) => {
  const { error, value } = nameValidatorSchema.validate({ name });
  if (error) {
    throw new Error(error.details[0].message);
  }
  return value.name;
};

export default nameValidator;
