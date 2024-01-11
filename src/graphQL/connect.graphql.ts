import express from "express";
import http from "http";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./schema/schema.index";
import resolvers from "./resolvers/resolvers.index";

async function apolloServerConnect(port: string | number = 4000) {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  server.applyMiddleware({ app });

  new Promise((resolve, reject) => {
    httpServer.listen(port).once("listening", resolve).once("error", reject);
  });
  console.log(
    `Server graphql is ready at http://localhost:${
      process.env.PORT_GRAPHQL || 4000
    }${server.graphqlPath}`
  );
}

export default apolloServerConnect;
