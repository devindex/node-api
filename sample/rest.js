const Router = require('@koa/router');
const ctrl = require('./controllers/sample');

const router = new Router();

router.get('/', ctrl.index);

module.exports = { router };
