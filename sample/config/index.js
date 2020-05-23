import app from './app';

export const configs = {
  app,
};

export async function startup(config) {
  console.log(`App in ${config.get('app.mode')} mode`);
}
