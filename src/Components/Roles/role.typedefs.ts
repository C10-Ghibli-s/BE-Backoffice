import { gql } from 'apollo-server-hapi';
import * as queries from './role.queries';
import * as mutations from './role.mutations';
import * as scalars from './../../GraphQL/scalars';
import { types } from './../../GraphQL/types';

export const roleTypeDefs = gql `
  scalar DateTime

  enum Status {
    ACTIVE
    SUSPENDED
    BANNED
  }

  enum Role {
    USER
    ADMIN
    SUPERADMIN
  }

  interface BaseModel {
    id: ID!
    updatedAt: DateTime
    createdAt: DateTime!
    status: Status!
  }

  type Roles implements BaseModel {
    id: ID!
    updatedAt: DateTime
    createdAt: DateTime!
    status: Status!

    name: Role!
    user: [Users]
  }

  input RoleInput {
    name: Role!
    status: Status!
  }

  input RoleEditInput {
    name: Role
    status: Status
  }

  extend type Query {
    "Return all roles"
    showAllRoles: [Roles]
    "Return a Role"
    getARole(id: ID!): Roles
  }

  extend type Mutation {
    "Create a Role"
    createRole(data: RoleInput!): Roles
    "Edit a Role"
    updateRole(id: ID!, data: RoleEditInput!): Roles
    "Delete a Role"
    deleteRole(id: ID!): String
  }
`;

export const rolesResolvers = {
  ...scalars,
  Query: queries,
  Mutation: mutations,
  ...types,
};
