import { gql } from 'apollo-server-hapi';
import * as queries from './user.queries';
import * as mutations from './user.mutations';

export const userTypeDefs = gql`
  scalar DateTime

  enum Status {
    ACTIVE
    SUSPENDED
    BANNED
  }

  interface BaseModel {
    id: ID!
    updatedAt: DateTime
    joinedAt: DateTime!
  }

  type Users implements BaseModel{
    id: ID!
    joinedAt: DateTime!
    updatedAt: DateTime

    nickname: String!
    profilePicture: String
    password: String!
    role: Roles
    status: Status
    interactions: [Interactions]
  }


  input UserInput {
    nickname: String!
    password: String!
    profilePicture: String
    status: Status!
  }

  extend type Query {
    "Return all the users"
    showAllUsers: [Users]
  }

  extend type Mutation {
    "Create a new user"
    createUser(data: UserInput!): Users
  }
`;

export const userResolvers = {
  Query: queries,
  Mutation: mutations,
};
