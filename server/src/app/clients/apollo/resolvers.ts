import { NonEmptyArray, } from 'type-graphql';
import { AccountResolver, PostResolver, LikeResolver, CommentResolver, MessageResolver } from '../../../apollo';
import { SampleResolver } from '../../../apollo/resolvers/notifications/notification';
export default [AccountResolver, PostResolver, LikeResolver, CommentResolver, MessageResolver, SampleResolver] as NonEmptyArray<any> | NonEmptyArray<string>