import { PubSub } from 'graphql-subscriptions';
import { User } from '../../apollo/resolvers/account/types';

export interface AppContext {
    user: User
    pubSub: PubSub;
}