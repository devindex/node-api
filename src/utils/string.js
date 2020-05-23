export function hexToBase64(str) {
  return Buffer.from(str, 'hex').toString('base64');
}

export function base64ToHex(str) {
  return Buffer.from(str, 'base64').toString('hex');
}

export function clearNonNumbers(value, defaultValue = null) {
  switch (typeof value) {
    case 'string':
      value = value.replace(/\D/g, '');
      return value === '' ? defaultValue : value;
    case 'number':
      return value.toString();
    default:
      return defaultValue;
  }
}

export function capitalizeWord(word) {
  if (typeof word !== 'string') {
    return '';
  }

  if (word.charAt(0) === '(') {
    return `(${word.charAt(1).toUpperCase()}${word.substring(2)}`;
  }

  return word.charAt(0).toUpperCase() + word.substring(1);
}

export function capitalize(value, ignore = []) {
  if (typeof value !== 'string') {
    return '';
  }

  return value
    .trim()
    .toLowerCase()
    .split(' ')
    .map((part) => (ignore.indexOf(part) !== -1 ? part : capitalizeWord(part)))
    .join(' ');
}

export function capitalizeNameBR(value) {
  if (typeof value !== 'string') {
    return '';
  }

  value = value.replace(/\s{2,}/g, ' ');
  return capitalize(value, [
    'da', 'de', 'do', 'das', 'dos', 'e', 'em', 'ou', 'no', 'na', 'c/', 's/',
  ]);
}

export function capitalizeFirst(value) {
  if (typeof value !== 'string') {
    return '';
  }

  return value
    .replace(/\s{2,}/g, ' ')
    .toLowerCase()
    .split('(')
    .map((part) => capitalizeWord(part.toLowerCase()))
    .join('(')
    .replace(/[a-z]/, (char) => char.toUpperCase());
}

export function removeAccentuation(text) {
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
    .replace(/[ÚÙÛ]/g, 'U')
    .replace(/[úùû]/g, 'u')
    .replace(/[Ç]/g, 'C')
    .replace(/[ç]/g, 'c');
}

export function parsePhoneBR(phone, defaultDDD = '00') {
  if (!phone) return '';

  phone = phone.toString();

  let ddd = defaultDDD;

  if (phone.length > 5 && phone.length <= 9) {
    if (phone.length === 9 && !/^..[6-9]/.test(phone)) {
      ddd = phone.substr(0, 2);
      phone = `${ddd}3${phone.substr(2)}`;
    } else {
      phone = ddd + phone;
    }
  }

  if (phone.length === 10 && /^..[6-9]/.test(phone)) {
    ddd = phone.substr(0, 2);
    phone = `${ddd}9${phone.substr(2)}`;
  }
  return phone;
}
