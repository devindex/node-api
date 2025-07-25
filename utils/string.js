exports.hexToBase64 = function hexToBase64(str) {
  return Buffer.from(str, 'hex').toString('base64');
};

exports.base64ToHex = function base64ToHex(str) {
  return Buffer.from(str, 'base64').toString('hex');
};

exports.sanitizeDigits = function sanitizeDigits(value, defaultValue = '') {
  switch (typeof value) {
    case 'string':
      value = value.replace(/\D/g, '');
      return value === '' ? defaultValue : value;
    case 'number':
      return value.toString();
    default:
      return defaultValue;
  }
};

exports.sanitizeChars = function sanitizeChars(text) {
  return text ? text.replace(/[^a-zA-Z0-9]/g, ' ').trim() : '';
};

exports.removeAccents = function removeAccents(text) {
  return text ? text.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : '';
};

/**
 * @deprecated Use `sanitizeDigits` instead.
 * This function will be removed in the next major release.
 */
exports.clearNonNumbers = function clearNonNumbers(value, defaultValue = '') {
  return exports.sanitizeDigits(value, defaultValue);
};

/**
 * @deprecated Use `removeAccents` instead.
 * This function will be removed in the next major release.
 */
exports.removeAccentuation = function removeAccentuation(text) {
  if (!text) return '';

  return text
    .replace(/[ÁÀÂÃ]/g, 'A')
    .replace(/[áàâã]/g, 'a')
    .replace(/[ÉÈÊ]/g, 'E')
    .replace(/[éèê]/g, 'e')
    .replace(/[ÍÌÎ]/g, 'I')
    .replace(/[íìî]/g, 'i')
    .replace(/[ÓÒÔÕ]/g, 'O')
    .replace(/[óòôõ]/g, 'o')
    .replace(/[ÚÙÛÜ]/g, 'U')
    .replace(/[úùûü]/g, 'u')
    .replace(/[Ç]/g, 'C')
    .replace(/[ç]/g, 'c');
};

exports.escapeRegex = function escapeRegex(str) {
  return str ? str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') : '';
};

exports.capitalizeWord = function capitalizeWord(word) {
  if (typeof word !== 'string') {
    return '';
  }

  if (['(', '['].includes(word.charAt(0))) {
    return `${word.charAt(0)}${word.charAt(1).toUpperCase()}${word.substring(2)}`;
  }

  return word.charAt(0).toUpperCase() + word.substring(1);
};

exports.capitalize = function capitalize(value, skipTerms = []) {
  if (typeof value !== 'string') {
    return '';
  }

  const parsedSkipTerms = Array.isArray(skipTerms)
    ? skipTerms.map((term) => term.toLowerCase())
    : [];

  const normalizeSubParts = (part, separator) => (
    part
      .split(separator)
      .map((sub) => (sub ? exports.capitalizeWord(sub) : ''))
      .join(separator)
  );

  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .split(' ')
    .map((part, i) => {
      if (i > 0 && parsedSkipTerms.includes(part)) {
        return part;
      }

      if (part.includes('-')) {
        return normalizeSubParts(part, '-');
      }
      if (part.includes('\'')) {
        return normalizeSubParts(part, '\'');
      }

      return exports.capitalizeWord(part);
    })
    .join(' ');
};

exports.capitalizeNameBR = function capitalizeNameBR(value) {
  return module.exports.capitalize(value, [
    'da', 'de', 'do', 'das', 'dos', 'e', 'em', 'ou', 'no', 'na', 'c/', 's/',
  ]);
};

exports.capitalizeFirst = function capitalizeFirst(value) {
  if (typeof value !== 'string') {
    return '';
  }

  return value
    .replace(/\s{2,}/g, ' ')
    .toLowerCase()
    .split('(')
    .map((part) => exports.capitalizeWord(part.toLowerCase()))
    .join('(')
    .replace(/[a-z]/, (char) => char.toUpperCase());
};

exports.parsePhoneBR = function parsePhoneBR(phone, defaultDDD = '00') {
  if (!phone) return '';

  phone = phone.toString();

  let ddd = defaultDDD;

  if (phone.length > 5 && phone.length <= 9) {
    if (phone.length === 9 && !/^..[6-9]/.test(phone)) {
      ddd = phone.substring(0, 2);
      phone = `${ddd}3${phone.substring(2)}`;
    } else {
      phone = ddd + phone;
    }
  }

  if (phone.length === 10 && /^..[6-9]/.test(phone)) {
    ddd = phone.substring(0, 2);
    phone = `${ddd}9${phone.substring(2)}`;
  }
  return phone;
};
