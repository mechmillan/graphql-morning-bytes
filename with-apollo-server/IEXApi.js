const { RESTDataSource } = require("apollo-datasource-rest");

class IEXApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.iextrading.com/1.0/stock";
  }

  async getQuote(symbol) {
    return this.get(`/${symbol}/quote`);
  }
}

module.exports = IEXApi;
