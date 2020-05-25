const App = require('../lib/App');
const rest = require('./rest');
const config = require('./config');

const app = new App({
  config,
  router: rest.router,
});

app.start()
  .then(() => console.log(`Server running on port ${app.port}`));
