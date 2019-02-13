const express = require("express");
const http = require("http");
const { ApolloServer, gql } = require("apollo-server-express");
const IEXApi = require("./IEXApi");

// gql tagged template literal
// gql.apply(null, ["type Quote {\n close: Float \n ... }"])
const typeDefs = gql`
  type Quote {
    close: Float
    high: Float
    low: Float
    open: Float
    week52High: Float
  }

  type Query {
    getQuote(symbol: String!): Quote
  }
`;

const resolvers = {
  Query: {
    getQuote: async (_source, { symbol }, { dataSources }) => {
      return dataSources.iexApi.getQuote(symbol);
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    iexApi: new IEXApi()
  })
});

const app = express();

// same simplification: redirect index to /graphql
app.get("/", (req, res, next) => {
  res.redirect(`http://localhost:${PORT}${server.graphqlPath}`);
});

server.applyMiddleware({ app });

const PORT = 3775;
app.listen({ port: PORT }, () =>
  console.log(`Listening on http://localhost:${PORT}${server.graphqlPath}`)
);
