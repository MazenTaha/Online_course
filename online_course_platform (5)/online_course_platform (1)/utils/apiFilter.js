class ApiFilters {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filter() {
    const queryObj = { ...this.queryString };
    const excludedFilter = ["page", "limit", "fields", "sort"];
    excludedFilter.forEach((el) => {
      delete queryObj[el];
    });
    this.query = this.query.find(queryObj);
    return this;
  }
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort;
      //const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
      console.log(sortBy);
    }
    return this;
  }
  fields() {
    if (this.queryString.fields) {
      //const selectBy = this.queryString.fields;
      const selectBy = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(selectBy);
      console.log(selectBy);
    }
    return this;
  }
  pagination() {
    const page = +this.queryString.page || 1;
    const limit = +this.queryString.limit || 5;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
module.exports = ApiFilters;
