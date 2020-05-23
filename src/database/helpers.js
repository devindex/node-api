import {
  clearNonNumbers as clearNonNumbersHelper,
  capitalizeNameBR as capitalizeNameHelper,
} from '../utils/string';

export function clearNonNumbers(value) {
  return clearNonNumbersHelper(value, null);
}

export function capitalizeName(value) {
  return capitalizeNameHelper(value);
}

export function lowerCase(value) {
  return typeof value === 'string' ? value.toLowerCase() : value;
}

export function upperCase(value) {
  return typeof value === 'string' ? value.toUpperCase() : value;
}
