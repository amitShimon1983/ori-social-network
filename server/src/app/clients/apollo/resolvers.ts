import { NonEmptyArray, } from 'type-graphql';
import { AccountResolver, PostResolver, LikeResolver, CommentResolver, MessageResolver, ViewsResolver, AppMetadata, LiveResolver } from '../../../apollo';
import { SampleResolver } from '../../../apollo/resolvers/notifications/notification';
export default [
    AccountResolver,
    PostResolver,
    LikeResolver,
    CommentResolver,
    MessageResolver,
    SampleResolver,
    ViewsResolver,
    AppMetadata,
    LiveResolver
] as NonEmptyArray<any> | NonEmptyArray<string>