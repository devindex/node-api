const mongoose = require('mongoose');
const BaseModelBuilder = require('../ModelBuilder');
// eslint-disable-next-line no-unused-vars
const { buildToObjectOptions } = require('../utils/mongoose');

class ModelBuilder extends BaseModelBuilder {
  prepareSchemaDefinition(schemaDefinition, includesBase) {
    if (!includesBase) {
      return schemaDefinition;
    }
    return {
      customerId: {
        type: String,
        private: true,
      },
      facilityId: {
        type: String,
        private: true,
      },
      ...schemaDefinition,
      meta: {
        type: Map,
        of: {},
        private: false,
      },
    };
  }
}

(async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/node-api');

  const mainItemSchema = ModelBuilder.subSchema(
    { name: { type: String } },
    {},
    (doc, ret) => ({
      type: 'mainItem',
      name: ret.name,
    }),
  );

  const modelBuilder = new ModelBuilder({
    name: 'ApiDocuments',
    schema: {
      name: {
        type: String,
        required: true,
        transform: (v) => v.toUpperCase(),
      },
      active: {
        type: Boolean,
        required: true,
        private: true,
      },
      mainItem: {
        type: mainItemSchema,
      },
      items: {
        type: [ModelBuilder.subSchema({
          name: { type: String },
        })],
      },
    },
  });

  modelBuilder.setJSONHandler((doc, ret) => ({
    type: 'root',
    id: ret.id,
    name: ret.name,
    active: ret.active,
    mainItem: ret.mainItem,
    items: ret.items,
    meta: ret.meta,
  }));

  modelBuilder.schema.post('save', () => {
    console.log('postSave');
  });

  modelBuilder.schema.virtual('random').get(() => (
    Math.round(Math.random() * 1000)
  ));

  // modelBuilder.setToJSON(buildToObjectOptions(
  //   { virtuals: true },
  //   { hide: ['_id', 'createdAt', 'updatedAt'] },
  // ));

  const Model = modelBuilder.toModel();

  let doc = null;

  // doc = await Model.create({
  //   name: 'Sergio',
  //   active: true,
  //   mainItem: { name: 'Main item' },
  //   items: [{ name: 'Item #1' }],
  //   meta: { status: 'F3' },
  // });

  doc = await Model.findOne({}).sort({ _id: -1 });

  if (doc) {
    console.log(JSON.parse(JSON.stringify(doc)));
    // console.log(doc.toObject({ transform: null }));
  }
})();
