const { gql } = require("apollo-server");

const StateSchema = gql`
  type State {
    name: String
  }
  type Query {
    states(query: String!): [State!]!
    all: [State!]!
  }
`;

module.exports = StateSchema;