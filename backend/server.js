const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const StateSchema = require("./graphql/state.schema");
const StateService = require("./graphql/state.service");
const StateResolver = require("./graphql/state.resolver");
const http = require("http");
const PORT = process.env.PORT || 3001;
const app = require("./app");

async function startApolloServer(typeDefs, resolvers) {
  const httpServer = http.createServer(app)
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    dataSources: () => {
      return {
        stateService: StateService
      }
    }
  });
  await server.start();
  server.applyMiddleware({app});
  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
}

startApolloServer(StateSchema, StateResolver);