import { gql } from 'apollo-server-hapi';
import * as queries from './movies.queries';
import * as mutations from './movies.mutations';
import * as scalars from './../../GraphQL/scalars';
import { types } from './../../GraphQL/types';

export const moviesTypeDefs = gql `
  scalar DateTime

  interface BaseModel {
    id: ID!
    updatedAt: DateTime
    createdAt: DateTime!
    status: Status!
  }

  enum Status {
    ACTIVE
    SUSPENDED
    BANNED
  }

  type Movies implements BaseModel {
    id: ID!
    updatedAt: DateTime
    createdAt: DateTime!
    status: Status!

    filmDescription: String
    movieBanner: String
    audienceScore: Float
    releaseDate: String
    userName: String
    linkWiki: String
    duration: Int
    interactions: [Interactions]
    title: Titles
    directors: [Directors]
    musicians: [Musicians]
    writers: [Writers]
  }

  input MovieInput {
    filmDescription: String!
    movieBanner: String!
    audienceScore: Float
    releaseDate: String!
    userName: String!
    linkWiki: String
    duration: Int!
    status: Status

    title: String!
    originalTitle: String!
    romajiTitle: String
  }

  input MovieEditInput {
    filmDescription: String
    movieBanner: String
    audienceScore: Float
    releaseDate: String
    userName: String
    linkWiki: String
    duration: Int
    status: Status
  }

  input ArrayIdsInput {
    writersId: [Int]!
    directorsId: [Int]!
    musiciansId: [Int]!
  }

  extend type Query {
    "Return all Movies"
    showAllMovies: [Movies]
    "Return a Movie"
    getAMovie(id: ID!): Movies
  }

  extend type Mutation {
    "Create a new Movie"
    createAMovie(data: MovieInput!): Movies
    "Update a Movie"
    updateAMovie(id: ID!, data: MovieEditInput!): Movies
    "Delete a Movie"
    deleteMovie(id: ID!): String
    "Add Musicians, Directors, and Writers to a Movie"
    addPeople(movieId: ID!, data: ArrayIdsInput!): Movies
  }
`;

export const moviesResolvers = {
  ...scalars,
  Query: queries,
  Mutation: {
    createAMovie: mutations.createAMovie,
    updateAMovie: mutations.updateAMovie,
    deleteMovie: mutations.deleteMovie,
    addPeople: mutations.addPeople,
  },
  Movies: mutations.resolver,
  ...types,
};
