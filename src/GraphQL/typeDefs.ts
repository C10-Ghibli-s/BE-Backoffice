import { gql } from 'apollo-server-hapi';

export const typeDefs = gql`
  type Query {
    "Shows a greeting message"
    hello: String
  }
`;
