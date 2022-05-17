import { ApolloServer, ApolloServerPluginStopHapiServer} from 'apollo-server-hapi';
import { Server } from '@hapi/hapi';
import { routes } from './app.routes';
import { typeDefs } from './GraphQL/typeDefs';
import { resolvers } from './GraphQL/resolvers';
import * as config from './Config/default';

export async function init () {

  const app = new Server({
    port: config.port||3000,
    host: 'localhost',
    routes: {
      cors: true,
    }
  });
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    plugins: [ApolloServerPluginStopHapiServer({hapiServer: app})],
  });
  routes(app);

  await server.start();
  await server.applyMiddleware({ app });
  await app.start();
  console.log('Server running on %s', app.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

