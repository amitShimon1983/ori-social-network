
import { createServer } from 'http';
import {
    ApolloServerPluginDrainHttpServer,
    ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { Express } from 'express'
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { apolloHttpContext, apolloWsContext } from '../../../apollo';
import resolvers from './resolvers';
import { PubSub } from 'graphql-subscriptions';
const pubSub = new PubSub();

const createApolloServer = async (app: Express) => {

    const schema = await buildSchema({
        resolvers: resolvers,
        pubSub,
        validate: false,
        emitSchemaFile: true,
        nullableByDefault: true
    })
    const httpServer = createServer(app);
    const wsServer = new WebSocketServer({
        server: httpServer,
        path: '/api/graphql',
    });
    const serverCleanup = useServer({
        schema,
        context: (ctx, msg, args) => {
            return apolloWsContext(pubSub, ctx, msg, args);
        },
    }, wsServer);
    const server = new ApolloServer({
        context: apolloHttpContext(pubSub),
        schema: schema,
        csrfPrevention: true,
        cache: "bounded",
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose();
                        },
                    };
                },
            },
            ApolloServerPluginLandingPageLocalDefault({ embed: true }),
        ],
    });
    await server.start()
    server.applyMiddleware({ app, path: '/api/graphql', cors: false })
    return { httpServer, pubSub };
}
export default createApolloServer;