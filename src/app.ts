import { ApolloServer, ApolloServerPluginStopHapiServer} from 'apollo-server-hapi';
import { Server } from '@hapi/hapi';
import { routes } from './app.routes';
import { typeDefs, resolvers } from './GraphQL/schema';
import * as config from './Config/default';
import { PrismaClient } from '@prisma/client';

//* Instance of prisma ORM
const orm = new PrismaClient();

export async function init () {
  //* Instance hapi server
  const app = new Server({
    port: config.port||3000,
    host: 'localhost',
    routes: {
      cors: true,
    }
  });

  //* Instance Apollo server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
      orm,
    },
    csrfPrevention: true,
    plugins: [ApolloServerPluginStopHapiServer({hapiServer: app})],
  });
  routes(app);

  //* Initialize Apollo server
  await server.start();
  await server.applyMiddleware({ app });
  //* Initialize Hapi server
  await app.start();
  console.log('Server running on %s', app.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

