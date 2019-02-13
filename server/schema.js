// STEP 1: Build a GraphQL Type Schema which maps to your codebase
const {
  graphql,
  GraphQLFloat,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} = require("graphql");

const { IEXApi } = require("./IEXApi");
