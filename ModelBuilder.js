const mongoose = require('mongoose');
const { buildToObjectOptions } = require('./utils/mongoose');

mongoose.pluralize((name) => name.charAt(0).toLowerCase() + name.slice(1));

class ModelBuilder {
  /**
   * Constructs an instance of the ModelBuilder class.
   *
   * @param {Object} args - The arguments to initialize the ModelBuilder.
   * @param {string|null} [args.name=null] - The optional name of the model.
   * @param {Object} args.schema - The schema definition for the model.
   *  This is a required parameter and must be an object.
   * @param {Object} [args.schemaOptions={}] -
   *  Optional schema options to configure the schema behavior.
   * @param {Function|null} [args.jsonHandler=null] -
   *  An optional function to handle custom JSON processing.
   * @param {boolean} [args.includesBase=true] - Indicates whether to include base schema fields.
   * @throws {Error} Throws an error if the "schema" is not provided or is not an object.
   * @return {void} Does not return a value.
   */
  constructor(args) {
    const {
      name = null,
      schema,
      schemaOptions = {},
      jsonHandler = null,
      includesBase = true,
    } = args;

    if (!schema || typeof schema !== 'object') {
      throw new Error('ModelBuilder: "schema" is required and must be an object.');
    }

    this.name = name;
    this.schemaDefinition = this.prepareSchemaDefinition(schema, includesBase);
    this.schemaOptions = this.prepareSchemaOptions(schemaOptions);
    this.schema = new mongoose.Schema(this.schemaDefinition, this.schemaOptions);

    if (jsonHandler || typeof schemaOptions.toJSON === 'undefined') {
      this.setJSONHandler(jsonHandler);
    }
  }

  setToJSON(options) {
    this.schema.set('toJSON', options);
    return this;
  }

  setToObject(options) {
    this.schema.set('toObject', options);
    return this;
  }

  setJSONHandler(handler) {
    this.setToJSON(buildToObjectOptions({}, {
      hide: ['_id', ...this.getPrivateFields()],
      handler,
    }));
    return this;
  }

  toModel() {
    if (!this.name || typeof this.name !== 'string') {
      throw new Error('ModelBuilder: "name" is required and must be a string.');
    }

    return mongoose.model(this.name, this.schema);
  }

  /**
   * Override to provide base fields for the schema
   */
  baseSchemaDefinition() {
    return {};
  }

  prepareSchemaDefinition(schemaDefinition, includesBase) {
    return includesBase
      ? { ...this.baseSchemaDefinition(), ...schemaDefinition }
      : schemaDefinition;
  }

  getPrivateFields() {
    const { paths } = this.schema;
    return Object.keys(paths).reduce((acc, key) => (
      !paths[key].options.private ? acc : [...acc, key]
    ), []);
  }

  prepareSchemaOptions(schemaOptions) {
    const options = {
      timestamps: true,
      ...schemaOptions,
    };

    if ('_id' in options && options._id === false) {
      options.id = false;
    }

    if (typeof options.toObject === 'undefined') {
      options.toObject = { versionKey: false };
    }

    if (typeof options.toJSON === 'undefined') {
      options.toJSON = { versionKey: false };
    }

    return options;
  }

  /**
   * @deprecated Use subSchema(schema, schemaOptions = {}) method
   */
  static simpleSchema(schema, _id = true) {
    const builder = new ModelBuilder({
      schema,
      schemaOptions: { _id, timestamps: false },
      includesBase: false,
    });
    return builder.schema;
  }

  static subSchema(schema, schemaOptions = {}, jsonHandler = null) {
    const builder = new ModelBuilder({
      schema,
      schemaOptions: {
        _id: true,
        timestamps: false,
        ...schemaOptions,
      },
      includesBase: false,
      jsonHandler,
    });
    return builder.schema;
  }

  static createModel(args) {
    const model = new ModelBuilder(args);
    return model.toModel();
  }

  static get ObjectId() {
    return mongoose.Schema.Types.ObjectId;
  }
}

module.exports = ModelBuilder;
