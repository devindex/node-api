class Controller {
  formatItems(data, { offset, limit }) {
    return Object.assign(data, { offset, limit });
  }

  parseParams(data = {}) {
    const pagination = this.parsePaginationParams(data);
    const sort = this.parseSortParams(data);

    ['sort', 'offset', 'limit'].forEach((key) => delete data[key]);

    return { params: data, pagination, sort };
  }

  parsePaginationParams(data) {
    const offset = parseInt(data.offset, 10);
    const limit = parseInt(data.limit, 10);

    return {
      offset: Number.isNaN(offset) ? 0 : offset,
      limit: Number.isNaN(limit) ? this.paginationLimit : limit,
    };
  }

  parseSortParams(data) {
    const sort = {};

    if (data.sort && typeof data.sort === 'string') {
      data.sort.split(',').forEach((v) => {
        const value = v.trim();
        if (/^[+\-]/.test(value)) {
          sort[value.substring(1)] = value.charAt(0) === '-' ? -1 : 1;
        } else {
          sort[value] = 1;
        }
      });
    }

    return sort;
  }

  get paginationLimit() {
    return 20;
  }
}

export default Controller;
