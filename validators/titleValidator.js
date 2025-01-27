import joi from 'joi';

const titleValidatorSchema = joi.object({
  title: joi.string().min(5).required().messages({
    'string.min': 'The title must be at least 5 characters long.',
    'any.required': 'The title field is required.',
  }),
});

const titleValidator = (title) => {
  const { error, value } = titleValidatorSchema.validate({ title });
  if (error) {
    throw new Error(error.details[0].message);
  }
  return value.title;
};

export default titleValidator;
