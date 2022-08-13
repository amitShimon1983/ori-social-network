import { Mutation, Resolver, Query, Arg } from "type-graphql";
import { Comment, Comments } from "./types";

@Resolver()
export class CommentResolver {
    @Mutation(() => Comment)
    async commentPost(@Arg('args', () => LikePostArgs) args: LikePostArgs, @Ctx() context: any): Promise<Like | null | undefined> {
        const { user } = context;
        if (args.postId && user._id && args.action) {
            return likeService.likePost(args.postId, user._id, args.action) as Like;
        }
    }
    @Query(() => Comments)
    async getComments(@Arg('args', () => GetPostLikesArgs) args: GetPostLikesArgs): Promise<Likes | undefined> {
        if (args.postId) {
            return likeService.getPostLikes(args.postId) as Likes;
        }
        return undefined;
    }

}