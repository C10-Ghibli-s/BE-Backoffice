import { gql } from 'apollo-server-hapi';
import { userResolvers, userTypeDefs } from './../Components/Users/user.typedefs';
import { roleTypeDefs, rolesResolvers } from './../Components/Roles/role.typedefs';

const rootTypeDefs = gql`
  type Query {
    "Shows a greeting message"
    hello: String
  }
  type Mutation {
    _: String
  }
`;

const rootResolvers = {
  Query: {
    hello: () => 'Welcome to our API with GraphQL 🦔'
  }
};

export const typeDefs = [rootTypeDefs, userTypeDefs, roleTypeDefs];
export const resolvers = [rootResolvers, userResolvers, rolesResolvers];
