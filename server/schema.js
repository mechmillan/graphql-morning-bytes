// STEP 1: Build a GraphQL Type Schema which maps to your codebase
const {
  graphql,
  GraphQLFloat,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} = require("graphql");
const { IEXApi } = require("./IEXApi");

const CompanyType = new GraphQLObjectType({
  name: "Company",
  description: "Basic Company Object",
  fields: () => ({
    CEO: {
      type: GraphQLString,
      resolve: json => json.CEO
    },
    companyName: {
      type: GraphQLString,
      resolve: json => json.companyName
    },
    description: {
      type: GraphQLString,
      resolve: json => json.description
    },
    exchange: {
      type: GraphQLString,
      resolve: json => json.exchange
    }
  })
});

const QuoteType = new GraphQLObjectType({
  name: "Quote",
  description: "Basic Quote Object",
  fields: () => ({
    open: {
      type: GraphQLFloat,
      resolve: json => json.open
    },
    close: {
      type: GraphQLFloat,
      resolve: json => json.close
    },
    high: {
      type: GraphQLFloat,
      resolve: json => json.high
    },
    low: {
      type: GraphQLFloat,
      resolve: json => json.low
    },
    week52High: {
      type: GraphQLFloat,
      resolve: json => json.week52High
    }
  })
});

// instance of GraphQLSchema Constructor
// which takes a configuration object
module.exports = new GraphQLSchema({
  // root query operation
  // STEP 2, 3, 4: define queries, mutations, subscriptions
  query: new GraphQLObjectType({
    name: "Query",
    description: "Query for information about a company, by symbol",
    fields: () => ({
      Company: {
        type: CompanyType,
        args: {
          symbol: { type: GraphQLString } // define structure of accepted arg(s)
        },
        resolve: (root, args, context) =>
          context.companyLoader.load(args.symbol)
      },
      Quote: {
        type: QuoteType,
        args: {
          symbol: { type: GraphQLString }
        },
        resolve: (root, args, context) => context.quoteLoader.load(args.symbol)
      }
    })
  })
});
