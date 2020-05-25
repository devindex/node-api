const boom = require('@hapi/boom');
const Joi = require('@hapi/joi');

module.exports = (ctx, next) => {
  /**
   * Validate request data
   * @param {function} rules
   * @param {Object} params
   * @param {string} [params.source=body] - body|query
   * @param {boolean} [params.raw=false] - Use a Joi schema
   * @param {Object} validateOptions - Joi validate options
   * @throws Will throw an error if validation fails
   * @returns {Object}
   */
  ctx.validate = (rules, params = {}, validateOptions = {}) => {
    params = {
      source: 'body', // body|query
      raw: false,
      ...params,
    };

    validateOptions = {
      abortEarly: false,
      allowUnknown: true,
      ...validateOptions,
    };

    const data = ctx.request[params.source];
    const schema = params.raw ? rules(Joi) : Joi.object().keys(rules(Joi));

    const result = schema.validate(data, validateOptions);

    if (result.error && result.error.details) {
      const fieldErrors = {};

      result.error.details.forEach((item) => {
        const path = item.path.join('.') || '_';
        (fieldErrors[path] || (fieldErrors[path] = [])).push(item.message);
      });

      throw boom.badData('Validation Failed', { errors: fieldErrors });
    }

    return result;
  };

  return next();
};
