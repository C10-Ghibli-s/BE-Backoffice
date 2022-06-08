import { gql } from 'apollo-server-hapi';
import * as queries from './user.queries';
import * as mutations from './user.mutations';
import * as scalars from './../../GraphQL/scalars';
import { types } from './../../GraphQL/types';


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
    createdAt: DateTime!
    status: Status!
  }

  type Users implements BaseModel{
    id: ID!
    updatedAt: DateTime
    createdAt: DateTime!
    status: Status!

    nickname: String!
    profilePicture: String
    password: String!
    role: Roles
    roleId: Int!
    interactions: [Interactions]
  }


  input UserInput {
    nickname: String!
    password: String!
    profilePicture: String
    status: Status!
    roleId: Int!
  }

  input UserEditInput {
    nickname: String
    profilePicture: String
    status: Status
    roleId: Int!
  }

  extend type Query {
    "Return all the Users"
    showAllUsers: [Users]
    "Get an User"
    getAnUser(id: ID!): Users
  }

  extend type Mutation {
    "Create a new User"
    createUser(data: UserInput!): Users
    "Update a User"
    updateUser(id: ID!, data: UserEditInput!): Users
    "Delete a User"
    deleteAnUser(id: ID!): String
  }
`;

export const userResolvers = {
  ...scalars,
  Query: queries,
  Mutation: {
    createUser: mutations.createUser,
    updateUser: mutations.updateUser,
    deleteAnUser: mutations.deleteAnUser,
  },
  Users: mutations.resolver,
  ...types,
};
