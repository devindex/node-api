exports.buildToObjectOptions = function buildToObjectOptions(options = {}, params = {}) {
  const hide = [].concat(params.hide || []).filter(Boolean);
  const { handler } = params;

  return {
    getters: true,
    virtuals: false,
    versionKey: false,
    transform: (doc, ret, opts) => {
      const result = { ...ret };

      if (doc._id) {
        result.id = doc._id.toString();
      }

      const hideFields = Array.isArray(opts?.hide) ? opts.hide : hide;
      hideFields.forEach((field) => delete result[field]);

      return typeof handler === 'function' ? handler(doc, result, opts) : result;
    },
    ...options,
  };
};

exports.isModified = function isModified(doc, value) {
  const values = Array.isArray(value) ? value : [value];
  return doc.$locals?.modifiedPaths
    ? doc.$locals.modifiedPaths.some((v) => values.includes(v))
    : false;
};
