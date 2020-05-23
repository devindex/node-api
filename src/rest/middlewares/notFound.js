import boom from '@hapi/boom';

export default () => {
  throw boom.notFound();
};
