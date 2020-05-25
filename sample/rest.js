const Router = require('../lib/Router');
const { capitalize } = require('../lib/utils/string');

const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = {
    status: 'OK',
    name: capitalize(ctx.query.name || 'John Doe'),
  };
});

module.exports = { router };
