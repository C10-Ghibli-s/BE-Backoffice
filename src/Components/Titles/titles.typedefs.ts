import { gql } from 'apollo-server-hapi';
import * as queries from './titles.queries';
import * as mutations from './titles.mutations';

export const titleTypeDefs = gql `

  type Titles {
    id: ID!
    title: String!
    originalTitle: String!
    romajiTitle: String
    movieId: Int!
    movie: Movies
  }

  input TitleInput {
    title: String!
    originalTitle: String!
    romajiTitle: String
    movieId: Int!
  }

  input TitleEditInput {
    title: String
    originalTitle: String
    romajiTitle: String
    movie: Int
  }

  extend type Query {
    "Return all Titles"
    showAllTitles: [Titles]
    "Return a Title"
    getATitle(id: ID!): Titles
  }

  extend type Mutation {
    "Create a Title"
    createTitle(data: TitleInput!): Titles
    "Edit a Title"
    updateTitle(id: ID!, data: TitleEditInput!): Titles
    "Delete a Title"
    deleteTitle(id: ID!): String
  }
`;

export const titlesResolvers = {
  Query: queries,
  Mutation: {
    createTitle: mutations.createTitle,
    updateTitle: mutations.updateTitle,
    deleteTitle: mutations.deleteTitle,
  },
  Titles: mutations.resolver,
};
