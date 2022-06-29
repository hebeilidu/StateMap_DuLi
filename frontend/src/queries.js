import { gql } from "apollo-boost";

export const SEARCH_STATES = gql`
  query searchState($query: String!){
    states(query: $query) {
      name
    }
  }
`;

export const ALL_STATES = gql`
  query  {
    all {
      name
    }
  }
`;