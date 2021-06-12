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
