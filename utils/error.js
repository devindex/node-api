const boom = require('@hapi/boom');

exports.unauthorized = function unauthorized(message, reason) {
  return new boom.Boom(message, { statusCode: 401, data: { reason } });
};
