import {
  ApolloServer,
  ApolloServerPluginStopHapiServer,
} from 'apollo-server-hapi';
import { Server } from '@hapi/hapi';
import { routes } from './app.routes';
import { typeDefs, resolvers } from './GraphQL/schema';
import config from './Config/default';
import { PrismaClient } from '@prisma/client';
import { configValidator } from './Config/validatorSchema';
import { CheckJWT } from './auth/auth.strategy';

//* Instance of prisma ORM
const orm = new PrismaClient();

export async function init() {
  //* Instance hapi server
  const app = new Server({
    port: config.port || 3000,
    host: 'localhost',
    //! Remember to add only the base URL from the FE
    routes: {
      cors: true,
    },
  });
  //* Instance Apollo server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
      orm,
    },
    csrfPrevention: true,
    plugins: [ApolloServerPluginStopHapiServer({ hapiServer: app })],
  });
  routes(app);
  /* //? Pino function
  await app.register({
    plugin: require('hapi-pino'),
    options: {
      // prettyPrint: process.env.NODE_ENV !== 'production',
      // Redact Authorization headers, see https://getpino.io/#/docs/redaction
      redact: ['req.headers.authorization'],
      ignorePaths: ['/graphql'],
    }
  }); */
  // * Initialaice the strategy verify tokens
  await CheckJWT(app);

  //! 🚧 Validation schema
  configValidator(process.env, app);

  //? Initialize Apollo server
  await server.start();
  await server.applyMiddleware({ app });
}

// * Manage the unhandledRejection error
process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

// * Manage the unhandledException error
process.on('uncaughtException', (error) => {
  console.error('unhandledException', error.message, error);
});
