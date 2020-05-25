const app = require('./app');

const configs = {
  app,
};

async function startup(config) {
  console.log(`App in ${config.get('app.mode')} mode`);
}

module.exports = { configs, startup };
