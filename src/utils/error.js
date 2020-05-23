import boom from '@hapi/boom';

export function unauthorized(message, reason) {
  return new boom.Boom(message, { statusCode: 401, data: { reason } });
}
