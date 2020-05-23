import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import Config from './Config';
import errorMiddleware from './rest/middlewares/error';
import validatorMiddleware from './rest/middlewares/validator';
import notFoundMiddleware from './rest/middlewares/notFound';

export default class App {
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
