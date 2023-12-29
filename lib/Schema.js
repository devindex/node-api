const mongoose = require('mongoose');

const MongooseSchema = mongoose.Schema;

mongoose.pluralize((name) => name
  .split('.')
  .map((v) => v.replace(/^[A-Z]/, ($) => $.toLowerCase()))
  .join('.'));

class Schema {
  constructor(data) {
    this.data = data;
    return this.createSchema();
  }

  createSchema() {
    return new MongooseSchema(this.data.fields, this.options);
  }

  get options() {
    if ('_id' in this.data && this.data._id === false) {
      this.data.id = false;
    }

    const options = {
      timestamps: true,
      toJSON: this.toObject(this.data.JSONHandler || null),
      toObject: this.toObject(),
      ...this.data,
    };

    delete options.fields;

    return options;
  }

  toObject(handler = null) {
    return {
      getters: true,
      virtuals: false,
      aliases: false,
      hide: ['_id', '__v'].concat(this.data.hide || []),
      transform: (doc, ret, options) => {
        if (this.data.id !== false) {
          ret.id = doc.id;
        }
        if (options.hide) {
          options.hide.forEach((field) => delete ret[field]);
        }
        if (typeof handler === 'function') {
          return handler(doc, ret, options);
        }
        return ret;
      },
    };
  }

  static simple(fields, _id = true) {
    return new Schema({ fields, _id, timestamps: false });
  }

  static get ObjectId() {
    return MongooseSchema.Types.ObjectId;
  }
}

module.exports = Schema;
