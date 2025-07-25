const Controller = require('../../Controller');
const { capitalize } = require('../../utils/string');

class SampleController extends Controller {
  constructor() {
    super(['index']);
  }

  async index(ctx) {
    const params = this.parseParams(ctx.query);

    const name = capitalize(ctx.query.name || 'item');
    const size = Number(ctx.query.size) || 30;

    ctx.body = {
      result: this.formatItems({
        items: new Array(size)
          .fill('')
          .map((v, i) => `${name} ${this.pad(i + 1)}`),
      }, params.pagination),
      request: params,
    };
  }

  pad(value) {
    return value > 9 ? value : `0${value}`;
  }
}

module.exports = new SampleController();
