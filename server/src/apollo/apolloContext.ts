import { PubSub } from 'graphql-subscriptions';
import { Request, Response } from 'express';
import { SubscribeMessage } from 'graphql-ws';
import { ExecutionArgs } from 'graphql';
import { authenticateRequestMiddleware } from '../app/middleware/authenticationMiddleware';

export const apolloHttpContext = (pubSub: PubSub) => async ({ req, res }: { req: Request; res: Response }) => {
    if (req.body.operationName === 'IntrospectionQuery') {
        return {}
    }
    const token = req?.cookies?.user;
    const user = await authenticateRequestMiddleware(token, res);
    return { user, pubSub }
}
export const apolloWsContext = async (pubSub: PubSub, ctx: any, msg: SubscribeMessage, args: ExecutionArgs) => {
    const req = ctx.extra.request;
    const cookie = req.rawHeaders.find((header: string) => header.includes('user='));
    const user = await authenticateRequestMiddleware(cookie?.split?.('=')?.[1]);
    return { user, pubSub }
};