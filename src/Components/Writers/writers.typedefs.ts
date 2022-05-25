import { gql } from 'apollo-server-hapi';
import * as queries from './writers.queries';
import * as mutations from './writers.mutations';
import * as scalars from './../../GraphQL/scalars';

export const writersTypeDefs = gql `

  type Writers {
    id: ID!
    name: String!
    movies: [Movies]
  }

  input WriterInput {
    name: String!
  }

  input WriterEditInput {
    name: String
  }

  extend type Query {
    "Return all Writers"
    showAllWriters: [Writers]
    "Return a Writer"
    getAWriter(id: ID!): Writers
  }

  extend type Mutation {
    "Create a Writer"
    createWriter(data: WriterInput!): Writers
    "Edit a Writer"
    updateWriter(id: ID!, data: WriterEditInput!): Writers
    "Delete a Writer"
    deleteWriter(id: ID!): String
  }
`;

export const writersResolvers = {
  ...scalars,
  Query: queries,
  Mutation: mutations,
};
