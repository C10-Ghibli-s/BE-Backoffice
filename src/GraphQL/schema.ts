import { gql } from 'apollo-server-hapi';
import {
  userResolvers,
  userTypeDefs,
} from './../Components/Users/user.typedefs';
import {
  roleTypeDefs,
  rolesResolvers,
} from './../Components/Roles/role.typedefs';
import {
  titleTypeDefs,
  titlesResolvers,
} from './../Components/Titles/titles.typedefs';
import {
  writersTypeDefs,
  writersResolvers,
} from './../Components/Writers/writers.typedefs';
import {
  musiciansResolvers,
  musiciansTypeDefs,
} from './../Components/Musicians/musicians.typedefs';
import {
  directorsResolvers,
  directorsTypeDefs,
} from './../Components/Directors/directors.typedefs';
import {
  interactionsResolvers,
  interactionsTypeDefs,
} from './../Components/Interactions/interations.typedefs';

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
    hello: () => 'Welcome to our API with GraphQL 🦔',
  },
};

export const typeDefs = [
  rootTypeDefs,
  userTypeDefs,
  roleTypeDefs,
  titleTypeDefs,
  writersTypeDefs,
  musiciansTypeDefs,
  directorsTypeDefs,
  interactionsTypeDefs,
];
export const resolvers = [
  rootResolvers,
  userResolvers,
  rolesResolvers,
  titlesResolvers,
  writersResolvers,
  musiciansResolvers,
  directorsResolvers,
  interactionsResolvers,
];
