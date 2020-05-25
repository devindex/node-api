exports.parse = function parse(value) {
  switch (typeof value) {
    case 'boolean':
      return value;
    case 'string':
      return ['true', 'yes', '1'].includes(value.toLowerCase());
    case 'number':
      return value === 1;
    default:
      return false;
  }
};
