const configs = {};

class Config {
  static async init(args) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line
      require('dotenv').config();
    }

    process.env.NODE_ENV = process.env.NODE_ENV || 'development';
    process.env.PORT = process.env.PORT || 3000;

    if ('configs' in args) {
      Object.keys(args.configs).forEach((key) => {
        configs[key] = args.configs[key]();
      });
    }

    if ('startup' in args && typeof args.startup === 'function') {
      await args.startup(Config);
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
