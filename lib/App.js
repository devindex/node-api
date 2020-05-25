const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const Config = require('./Config');
const errorMiddleware = require('./rest/middlewares/error');
const validatorMiddleware = require('./rest/middlewares/validator');
const notFoundMiddleware = require('./rest/middlewares/notFound');

class App {
  constructor(options = {}) {
    const {
      port = null,
      cors: corsOptions = {},
      bodyParser: bodyParserOptions = {},
      config = null,
      router = null,
    } = options;

    this.port = port;
    this.config = config;
    this.router = router;

    this.app = new Koa();

    if (corsOptions !== false) {
      this.addMiddleware(cors(corsOptions));
    }

    if (bodyParserOptions !== false) {
      this.addMiddleware(bodyParser(bodyParserOptions));
    }

    this.addMiddleware(errorMiddleware);
    this.addMiddleware(validatorMiddleware);
  }

  addMiddlewares(middlewares) {
    middlewares.forEach((middleware) => this.addMiddleware(middleware));
    return this;
  }

  addMiddleware(middleware) {
    this.app.use(middleware);
    return this;
  }

  addRouter(router) {
    this.addMiddleware(router.routes());
    return this;
  }

  async start() {
    await Config.init(this.config || {});

    if (this.router !== null) {
      this.addRouter(this.router);
    }

    if (this.port === null) {
      this.port = process.env.PORT || 3000;
    }

    this.addMiddleware(notFoundMiddleware);
    return this.app.listen(this.port);
  }
}

module.exports = App;
