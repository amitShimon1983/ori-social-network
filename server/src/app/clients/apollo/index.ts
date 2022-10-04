
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
import { apolloContext } from '../../../apollo';
import resolvers from './resolvers'
import { UserModel } from '../../../model';
const getDynamicContext = async (ctx: any, msg: any, args: any) => {
    // ctx is the graphql-ws Context where connectionParams live
    if (ctx.connectionParams.authentication) {
        const currentUser = await UserModel.find({});
        return { currentUser };
    }
    // Otherwise let our resolvers know we don't have a current user
    return { currentUser: null };
};
const createApolloServer = async (app: Express) => {

    const schema = await buildSchema({
        resolvers: resolvers,
        validate: false,
        emitSchemaFile: true,
        nullableByDefault: true
    })
    const httpServer = createServer(app);
    // Hand in the schema we just created and have the
    // WebSocketServer start listening.
    // Creating the WebSocket server
    const wsServer = new WebSocketServer({
        // This is the `httpServer` we created in a previous step.
        server: httpServer,
        // Pass a different path here if your ApolloServer serves at
        // a different path.
        path: '/api/graphql',
    });
    const serverCleanup = useServer({
        schema,
        context: (ctx, msg, args) => {
            // Returning an object will add that information to our
            // GraphQL context, which all of our resolvers have access to.
            return getDynamicContext(ctx, msg, args);
        },
    }, wsServer);
    const server = new ApolloServer({
        context: apolloContext(),
        schema: schema,
        csrfPrevention: true,
        cache: "bounded",
        plugins: [
            // Proper shutdown for the HTTP server.
            ApolloServerPluginDrainHttpServer({ httpServer }),

            // Proper shutdown for the WebSocket server.
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
    return httpServer;
}
export default createApolloServer;