import crypto from 'crypto';

export function random(size = 10) {
  return crypto.randomBytes(size / 2).toString('hex');
}

export function btoa(str) {
  let buffer;

  if (str instanceof Buffer) {
    buffer = str;
  } else {
    buffer = Buffer.from(str.toString(), 'binary');
  }

  return buffer.toString('base64');
}

export function atob(str) {
  return Buffer.from(str, 'base64').toString('binary');
}
