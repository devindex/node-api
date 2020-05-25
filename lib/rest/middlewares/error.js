const boom = require('@hapi/boom');

function handleErrors(err) {
  // Handle Boom Errors
  if (boom.isBoom(err)) {
    return err;
  }

  // Axios HTTP errors
  if (err.response) {
    return new boom.Boom(err.response.data.message, {
      statusCode: err.response.status,
      data: err.response.data,
    });
  }

  // Handle statusCode
  if (err.statusCode) {
    return new boom.Boom(err.message, {
      statusCode: err.statusCode,
    });
  }

  // Handle Mongoose Errors
  if (err.name === 'ValidationError') {
    const fieldErrors = Object.values(err.errors)
      .reduce((result, { path, message }) => {
        (result[path] || (result[path] = [])).push(message);
        return result;
      }, {});
    return boom.badData(err.message, { errors: fieldErrors });
  } if (err.name === 'CastError') {
    return boom.badRequest('Cast Error');
  }

  return boom.internal(err.message, { message: err.message });
}

module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    const err = handleErrors(e);
    ctx.status = err.output.statusCode;
    ctx.body = { ...err.output.payload, ...err.data };
  }
};
