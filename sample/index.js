import App from '../src/App';
import rest from './rest';
import * as config from './config';

const app = new App({
  config,
  router: rest.router,
});

app.start()
  .then(() => console.log(`Server running on port ${app.port}`));
