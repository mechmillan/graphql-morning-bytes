const cors = require("cors");
const express = require("express");
const DataLoader = require("dataloader"); // batching & caching
const IEXApi = require("./IEXApi");
const graphqlHTTP = require("express-graphql"); // returns express middleware
const morgan = require("morgan");
const schema = require("./schema"); // our defined schema

const app = express();
const logger = morgan("dev");

const PORT = 4775;
const GRAPHQL_ENDPOINT = "/graphql";

// configure logging middleware
app.use(logger);

// enable cors for client on localhost
let whitelist = ["http://localhost:3000"];
let corsOptions = {
  origin: (origin, callback) => {
    let originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  },
  credentials: true
};
app.use(cors(corsOptions));

// simplification: redirect index to /graphql
app.get("/", (req, res, next) => {
  res.redirect(GRAPHQL_ENDPOINT);
});

// mount express-graphql on '/graphql' as a route-handler
app.use(
  GRAPHQL_ENDPOINT,
  graphqlHTTP(req => {
    // STEP 5: define your resolvers
    // batch loading functions
    // accepting an array of keys and returning
    // promises that resolve to an array of values
    const companyLoader = new DataLoader(keys =>
      Promise.all(keys.map(IEXApi.getCompanyInfo))
    );

    const quoteLoader = new DataLoader(keys =>
      Promise.all(keys.map(IEXApi.getQuote))
    );

    const topsLoader = new DataLoader(keys =>
      Promise.all(keys.map(IEX.getTopsBySymbol))
    );

    return {
      schema,
      context: {
        companyLoader,
        quoteLoader,
        topsLoader
      },
      graphiql: true // interactive IDE enabled
    };
  })
);

app.listen(PORT, () =>
  console.log(
    `Listening on PORT: ${PORT}. Visit /graphql to see interactive IDE.`
  )
);
