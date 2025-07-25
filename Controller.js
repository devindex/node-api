const HAS_MORE = 'HAS_MORE';

class Controller {
  constructor(methods = []) {
    this.paginationMode = HAS_MORE;
    this.paginationLimit = 20;

    methods.forEach((method) => {
      this[method] = this[method].bind(this);
    });
  }

  formatItems(data, { offset, limit }) {
    if (this.paginationMode === HAS_MORE) {
      return {
        ...data,
        items: limit > 0 ? data.items.slice(0, limit - 1) : data.items,
        hasMore: limit > 0 && data.items.length > limit - 1,
      };
    }

    return { ...data, offset, limit };
  }

  parseParams(data = {}) {
    const pagination = this.parsePaginationParams(data);
    const sort = this.parseSortParams(data);

    ['sort', 'offset', 'limit'].forEach((key) => delete data[key]);

    return { params: data, pagination, sort };
  }

  parsePaginationParams(data) {
    const pagination = {
      offset: 'offset' in data ? parseInt(data.offset, 10) : 0,
      limit: 'limit' in data ? parseInt(data.limit, 10) : this.paginationLimit,
      mode: this.paginationMode,
    };

    if (Number.isNaN(pagination.offset)) {
      pagination.offset = 0;
    }

    if (Number.isNaN(pagination.limit)) {
      pagination.limit = this.paginationLimit;
    }

    if (pagination.limit > 0 && this.paginationMode === HAS_MORE) {
      pagination.limit += 1;
    }

    return pagination;
  }

  parseSortParams(data) {
    const sort = {};

    if (data.sort && typeof data.sort === 'string') {
      data.sort.split(',').forEach((v) => {
        const value = v.trim();
        if (/^[+-]/.test(value)) {
          sort[value.substring(1)] = value.charAt(0) === '-' ? -1 : 1;
        } else {
          sort[value] = 1;
        }
      });
    }

    return sort;
  }
}

module.exports = Controller;
