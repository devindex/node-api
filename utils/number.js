exports.round = function round(value, precision = 2) {
  const factor = 10 ** precision;
  return Math.round(value * factor) / factor;
};
