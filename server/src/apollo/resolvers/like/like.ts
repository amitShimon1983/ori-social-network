import { Resolver, Query, Ctx, Arg, Mutation } from "type-graphql";
import { likeService } from "../../../services";
import { Like, LikePostArgs, Likes, GetPostLikesArgs } from "./types";


@Resolver()
export class LikeResolver {

    @Mutation(() => Like)
    async likePost(@Arg('args', () => LikePostArgs) args: LikePostArgs, @Ctx() context: any): Promise<Like | null | undefined> {
        const { user } = context;
        if (args.postId && user._id && args.action) {
            return likeService.likePost(args.postId, user._id, args.action) as Like;
        }
    }
    @Query(() => Likes)
    async getLikes(@Arg('args', () => GetPostLikesArgs) args: GetPostLikesArgs): Promise<Likes | undefined> {
        if (args.postId) {
            return likeService.getPostLikes(args.postId) as Likes;
        }
        return undefined;
    }
}