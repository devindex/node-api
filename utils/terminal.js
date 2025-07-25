exports.getArgs = function getArgs() {
  return process.argv.slice(2)
    .reduce((result, arg) => {
      const [key, value = ''] = arg.replace('--', '').split('=');
      result[key] = value;
      return result;
    }, {});
};

exports.execute = function execute(fn) {
  (async () => {
    try {
      await fn();
    } catch (e) {
      console.log(e);
    }
    process.exit();
  })();
};
