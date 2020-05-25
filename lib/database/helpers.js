const {
  clearNonNumbers: clearNonNumbersHelper,
  capitalizeNameBR: capitalizeNameHelper,
} = require('../utils/string');

exports.clearNonNumbers = function clearNonNumbers(value) {
  return clearNonNumbersHelper(value, null);
};

exports.capitalizeName = function capitalizeName(value) {
  return capitalizeNameHelper(value);
};

exports.lowerCase = function lowerCase(value) {
  return typeof value === 'string' ? value.toLowerCase() : value;
};

exports.upperCase = function upperCase(value) {
  return typeof value === 'string' ? value.toUpperCase() : value;
};
