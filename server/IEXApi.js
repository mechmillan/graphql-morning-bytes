const fetch = require("node-fetch");

const BASE_ENDPOINT = "https://api.iextrading.com/1.0/stock";

const getCompanyInfo = symbol => {
  return fetch(`${BASE_ENDPOINT}/${symbol}/company`)
    .then(res => res.json())
    .catch(error => console.error(error));
};

const getQuote = symbol => {
  return fetch(`${BASE_ENDPOINT}/${symbol}/quote`)
    .then(res => res.json())
    .catch(error => console.error(error));
};

const IEXApi = {
  getQuote,
  getCompanyInfo
};

module.exports = IEXApi;
