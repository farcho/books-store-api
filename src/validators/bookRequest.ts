import Joi from 'joi';

export const bookPOSTSchema = Joi.object()
  .options({ abortEarly: false })
  .keys({
    name: Joi.string()
      .min(4)
      .max(200)
      .label('name')
      .required(),
    author: Joi.string()
      .min(4)
      .max(200)
      .label('author')
      .required(),
    price: Joi.number()
      .min(1)
      .max(20000)
      .label('price')
      .required()
  });
