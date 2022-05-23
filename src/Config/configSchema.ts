import * as Joi from 'joi';

export const envSchema = Joi.object().keys({
  API_KEY: Joi.string().required(),
  PORT: Joi.number().required(),
  DATABASE_URL: Joi.string().uri().required(),
}).unknown();
