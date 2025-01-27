import joi from 'joi';
import mongoose from 'mongoose';

const idValidatorSchema = joi.object({
  id: joi.string().custom((value) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new Error('Invalid id');
    }
    return value;
  }),
});

const idValidator = (id) => {
  const { error, value } = idValidatorSchema.validate({ id });
  if (error) {
    throw new Error(error.details[0].message);
  }
  return value.id;
};

export default idValidator;
