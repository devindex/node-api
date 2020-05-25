const crypto = require('crypto');

exports.random = function random(size = 10) {
  return crypto.randomBytes(size / 2).toString('hex');
};

exports.btoa = function btoa(str) {
  let buffer;

  if (str instanceof Buffer) {
    buffer = str;
  } else {
    buffer = Buffer.from(str.toString(), 'binary');
  }

  return buffer.toString('base64');
};

exports.atob = function atob(str) {
  return Buffer.from(str, 'base64').toString('binary');
};
