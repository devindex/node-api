import Router from '../src/Router';

const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = {
    status: 'OK',
    ...ctx.query,
  };
});

export default { router };
