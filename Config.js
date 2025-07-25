const configs = {};

class Config {
  static prepare(items = null) {
    if (!('NODE_ENV' in process.env) || !process.env.NODE_ENV) {
      // eslint-disable-next-line
      require('dotenv').config({ quiet: true });
    }

    process.env.NODE_ENV = process.env.NODE_ENV || 'development';
    process.env.PORT = process.env.PORT || 3000;

    if (items) {
      Object.keys(items).forEach((key) => {
        configs[key] = items[key]();
      });
    }
  }

  static async startup(callback) {
    if (typeof callback === 'function') {
      await callback(Config);
    } else {
      throw new Error('[config] "startup" is not a function');
    }
  }

  static async init(args) {
    Config.prepare('configs' in args ? args.configs : null);

    if ('startup' in args) {
      await Config.startup(args.startup);
    }
  }

  static load(path) {
    const parts = path.split('.');
    const name = parts.splice(0, 1);
    const config = configs[name];

    return { config, parts, name };
  }

  static get(path) {
    const { config, parts } = Config.load(path);

    if (parts.length > 0) {
      return parts.reduce((item, key) => item[key], config);
    }

    return config;
  }

  static set(path, value) {
    const data = Config.load(path);
    const { parts } = data;
    let { config } = data;

    if (parts.length > 0) {
      while (parts.length > 1) {
        config = config[parts.shift()];
      }

      config[parts.shift()] = value;
    }

    return this;
  }
}

module.exports = Config;
