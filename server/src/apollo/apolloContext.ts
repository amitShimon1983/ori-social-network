import { AuthenticationError } from 'apollo-server-errors';
import { authenticationService, cookieService, jwtService } from '../services';
import { PubSub } from 'graphql-subscriptions';
import { Request, Response } from 'express';
import { SubscribeMessage } from 'graphql-ws';
import { ExecutionArgs } from 'graphql';

export const apolloHttpContext = (pubSub: PubSub) => async ({ req, res }: { req: Request; res: Response }) => {
    if (req.body.operationName === 'IntrospectionQuery') {
        return {}
    }
    const token = req?.cookies?.user;
    return await authenticateRequest(token, pubSub, res);
}
export const apolloWsContext = async (pubSub: PubSub, ctx: any, msg: SubscribeMessage, args: ExecutionArgs) => {
    const req = ctx.extra.request;
    const cookie = req.rawHeaders.find((header: string) => header.includes('user='));
    return await authenticateRequest(cookie?.split?.('=')?.[1], pubSub);
};

async function authenticateRequest(token: string, pubSub: PubSub, res?: Response) {
    if (!token) {
        throw new AuthenticationError('UNAUTHENTICATED');
    }
    const { data, error } = jwtService.verify(token);
    if (error === 'UNAUTHENTICATED') {
        throw new AuthenticationError('UNAUTHENTICATED');
    }
    if (error === 'refresh_token') {
        const { isAuthenticate, token: resToken } = await authenticationService.refresh(token);
        if (isAuthenticate && res) {
            cookieService.setCookie(res, resToken, 'user');
        }
    }
    const user = JSON.parse(data);
    return {
        user,
        pubSub
    };
}


