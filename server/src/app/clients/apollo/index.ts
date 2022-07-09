import { Express } from 'express'
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { apolloContext, Account } from '../../../apollo';

const createApolloServer = async (app: Express) => {
    const server = new ApolloServer({
        context:  apolloContext(),
        schema: await buildSchema({
            resolvers: [Account],
            validate: false,
            emitSchemaFile: true,
            nullableByDefault: true
        })
    });
    await server.start()
    server.applyMiddleware({ app, path: '/api/graphql', cors: false })
    return server;
}
export default createApolloServer;