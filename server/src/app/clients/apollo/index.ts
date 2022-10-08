
import { createServer } from 'http';
import {
    ApolloServerPluginDrainHttpServer,
    ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { SubscribeMessage } from 'graphql-ws';
import { Express } from 'express'
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { apolloHttpContext, apolloWsContext } from '../../../apollo';
import resolvers from './resolvers';
import { PubSub } from 'graphql-subscriptions';
import { ExecutionArgs } from 'graphql';
import { Configuration } from '../../../model';
const pubSub = new PubSub();

const createApolloServer = async (app: Express, appConfig: Configuration) => {

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
        path: appConfig.apolloServerPath,
    });
    const serverCleanup = useServer({
        schema,
        context: (ctx, msg: SubscribeMessage, args: ExecutionArgs) => {
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
    server.applyMiddleware({ app, path: appConfig.apolloServerPath, cors: false })
    return { httpServer, pubSub };
}
export default createApolloServer;