const { Types } = require('mongoose');
const {
  sanitizeDigits: sanitizeDigitsHelper,
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

exports.sanitizeDigits = function sanitizeDigits(value) {
  return sanitizeDigitsHelper(value, '');
};

/**
 * @deprecated Use `sanitizeDigits` instead.
 * This function will be removed in the next major release.
 */
exports.clearNonNumbers = exports.sanitizeDigits;

exports.capitalizeName = function capitalizeName(value) {
  return capitalizeNameHelper(value);
};

exports.lowerCase = function lowerCase(value) {
  return typeof value === 'string' ? value.toLowerCase() : value;
};

exports.upperCase = function upperCase(value) {
  return typeof value === 'string' ? value.toUpperCase() : value;
};
