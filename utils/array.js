exports.asyncForEach = async function asyncForEach(array, callback) {
  for (let i = 0; i < array.length; i++) {
    await callback(array[i], i, array);
  }
};

exports.sortBy = function sortBy(items, field, desc = false) {
  return items.sort((a, b) => {
    if (a[field] > b[field]) return desc ? -1 : 1;
    if (a[field] < b[field]) return desc ? 1 : -1;
    return 0;
  });
};

exports.first = function first(items, defaultValue = null) {
  return Array.isArray(items) && items.length > 0
    ? items[0]
    : defaultValue;
};

exports.last = function last(items, defaultValue = null) {
  return Array.isArray(items) && items.length > 0
    ? items[items.length - 1]
    : defaultValue;
};

exports.ifNull = function ifNull(items, defaultValue = []) {
  return Array.isArray(items) ? items : defaultValue;
};

exports.hasItems = function hasItems(items) {
  return Array.isArray(items) && items.length > 0;
};
