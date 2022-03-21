import * as Joi from 'joi';

export default Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'testing').default('development'),
  PORT: Joi.number().default(3000)
});
