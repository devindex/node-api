const { Types } = require('mongoose');
const {
  clearNonNumbers: clearNonNumbersHelper,
  capitalizeNameBR: capitalizeNameHelper,
} = require('./string');

const uuidRegExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const objectIdRegExp = /^[0-9a-fA-F]{24}$/;

exports.isObjectId = function isObjectId(id) {
  if (!id) return false;
  if (typeof id === 'string') {
    return id.length === 24 && objectIdRegExp.test(id);
  }
  return id instanceof Types.ObjectId;
};

exports.isUUID = function isUUID(id) {
  if (!id) return false;
  if (typeof id === 'string') {
    return id.length === 36 && uuidRegExp.test(id);
  }
  return false;
};

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
