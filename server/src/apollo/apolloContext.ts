import { AuthenticationError } from 'apollo-server-errors';
import { jwtService } from '../services';

export const apolloContext = () => ({ req, res, event }: { req: any; res: any; event: any; }) => {
    if (req.body.operationName === 'IntrospectionQuery') {
        return {}
    }

    if (!req?.cookies?.user) {
        throw new AuthenticationError('UNAUTHENTICATED');
    }
    const user = jwtService.verify(req?.cookies?.user);
    return {
        user: JSON.parse(user?.data)
    }
}