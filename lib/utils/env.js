exports.getValue = function getValue(name, defaults = {}) {
  const { env } = process;
  if (env[name]) {
    return env[name];
  }

  if (defaults) {
    if (typeof defaults === 'string') {
      return defaults;
    }

    const mode = env.NODE_ENV;
    if (mode in defaults) {
      return defaults[mode];
    }

    if ('default' in defaults) {
      return defaults.default;
    }
  }

  return null;
};
