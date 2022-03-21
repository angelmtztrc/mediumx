import * as Joi from 'joi';

export default Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'testing').default('development'),
  PORT: Joi.number().default(3000),
  DATABASE_PORT: Joi.number().default(5432),
  DATABASE_HOST: Joi.string().default('localhost'),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required()
});
