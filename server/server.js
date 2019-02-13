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

app.listen(PORT, () =>
  console.log(
    `Listening on PORT: ${PORT}. Visit /graphql to see interactive IDE.`
  )
);
