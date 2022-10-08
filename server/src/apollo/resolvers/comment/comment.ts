import { Mutation, Resolver, Query, Arg, Ctx, } from "type-graphql";
import { AppContext } from "../../../model";
import { commentService } from "../../../services";
import { Comment, Comments, CommentPostArgs, GetPostCommentsArgs } from "./types";

@Resolver()
export class CommentResolver {
    @Mutation(() => Comment)
    async commentPost(@Arg('args', () => CommentPostArgs) args: CommentPostArgs, @Ctx() context: AppContext): Promise<Comment | null | undefined> {
        const { user } = context;
        if (args.postId && user._id && args?.content) {
            const payload: any = { message: "input.content" };
            try {
                await context.pubSub.publish("NOTIFICATIONS", payload);
            }
            catch (error: any) {
                console.log(error);
            }
            return commentService.commentPost(user._id, args.postId, args.content, args.commentId) as Comment

        }
    }

    @Query(() => Comments)
    async getComments(@Arg('args', () => GetPostCommentsArgs) args: GetPostCommentsArgs): Promise<Comments | undefined> {
        if (args.postId) {
            return commentService.getPostComments(args.postId, args?.commentId, args?.skip, args?.limit) as Promise<Comments>;
        }
        return undefined;
    }
}