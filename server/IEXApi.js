const fetch = require("node-fetch");
const { execute, subscribe } = require("graphql");

const BASE_ENDPOINT = "https://api.iextrading.com/1.0/stock";
const TOPS_ENDPOINT = "https://api.iextrading.com/1.0/tops?symbols";

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

const getTopsBySymbol = symbol => {
  return fetch(`${TOPS_ENDPOINT}=${symbol}`)
    .then(res => res.json())
    .catch(error => console.error(error));
};

const IEXApi = {
  getQuote,
  getCompanyInfo,
  getTopsBySymbol
};

module.exports = IEXApi;
