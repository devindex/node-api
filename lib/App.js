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

    this.middlewares = [];

    this.app = new Koa();

    Config.prepare('configs' in config ? config.configs : null);

    if (corsOptions !== false) {
      this.addMiddleware(cors(corsOptions));
    }

    if (bodyParserOptions !== false) {
      this.addMiddleware(bodyParser(bodyParserOptions));
    }

    this.addMiddleware(validatorMiddleware);
  }

  addMiddlewares(middlewares) {
    this.middlewares.push(...middlewares);
    return this;
  }

  addMiddleware(middleware) {
    this.middlewares.push(middleware);
    return this;
  }

  async start() {
    if ('startup' in this.config) {
      await Config.startup(this.config.startup);
    }

    this.addMiddleware(errorMiddleware);

    if (this.router !== null) {
      this.addMiddleware(this.router.routes());
    }

    this.addMiddleware(notFoundMiddleware);

    // Apply middlewares
    this.middlewares.forEach((middleware) => {
      this.app.use(middleware);
    });

    if (this.port === null) {
      this.port = process.env.PORT || 3000;
    }

    return this.app.listen(this.port);
  }
}

module.exports = App;
