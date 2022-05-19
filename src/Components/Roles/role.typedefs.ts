import { gql } from 'apollo-server-hapi';
import * as queries from './role.queries';
import * as mutations from './role.mutations';

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

  interface BaseTime {
    id: ID!
    createdAT: DateTime!
    updatedAt: DateTime
  }

  type Roles implements BaseTime {
    id: ID!
    createdAT: DateTime!
    updatedAt: DateTime

    name: Role!
    status: Status!
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
  Query: queries,
  Mutation: mutations,
};
