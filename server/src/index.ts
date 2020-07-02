import { ApolloServer } from 'apollo-server';
import { PrismaClient } from '../prisma';
import typeDefs from './schema';
import resolvers from './resolvers';

const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({
    prisma,
  }),
});

server.listen({ port: process.env.PORT || '4000' }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

process.on('beforeExit', async () => {
  await prisma.disconnect();
  process.exit(0) // if you don't close yourself this will run forever
});
