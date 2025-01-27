import joi from 'joi';
import mongoose from 'mongoose';

const idValidatorSchema = joi.object({
  id: joi.string().custom((value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return helpers.error('any.invalid');
    }
    return value;
  }).required(),
});

const idValidator = (id) => {
  const { error, value } = idValidatorSchema.validate({ id });
  if (error) {
    throw new Error("id is not provided or is not valid");
  }
  return value.id;
};

export default idValidator;
