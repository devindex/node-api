const { App } = require('../lib');
const { router } = require('./rest');
const config = require('./config');

const app = new App({ config, router });

const logger = async (ctx, next) => {
  await next();

  console.log({
    request: {
      url: ctx.url,
      query: ctx.query,
    },
    response: {
      status: ctx.status,
      body: ctx.body,
    },
  });
};

app.addMiddleware(logger);

app.start()
  .then(() => console.log(`Server running on port ${app.port}`));
