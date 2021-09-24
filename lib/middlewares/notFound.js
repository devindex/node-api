const boom = require('@hapi/boom');

module.exports = () => {
  throw boom.notFound();
};
