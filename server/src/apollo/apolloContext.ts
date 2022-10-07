import { AuthenticationError } from 'apollo-server-errors';
import { jwtService } from '../services';
import { PubSub } from 'graphql-subscriptions';

export const apolloHttpContext = (pubSub: PubSub) => ({ req, }: { req: any; }) => {
    if (req.body.operationName === 'IntrospectionQuery') {
        return {}
    }
    const token = req?.cookies?.user;
    return authenticateRequest(token, pubSub);
}
export const apolloWsContext = (pubSub: PubSub, ctx: any, msg: any, args: any) => {
    const req = ctx.extra.request;
    const cookie = req.rawHeaders.find((header: string) => header.includes('user='));
    return authenticateRequest(cookie?.split?.('=')?.[1], pubSub);
};

function authenticateRequest(token: any, pubSub: PubSub) {
    if (!token) {
        throw new AuthenticationError('UNAUTHENTICATED');
    }
    const { data } = jwtService.verify(token);
    const user = JSON.parse(data);
    return {
        user,
        pubSub
    };
}
