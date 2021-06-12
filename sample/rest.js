const Router = require('../lib/Router');
const ctrl = require('./controllers/sample');

const router = new Router();

router.get('/', ctrl.index);

module.exports = { router };
