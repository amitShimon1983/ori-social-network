import { Mutation, Resolver, Query, Arg, Ctx } from "type-graphql";
import { commentService } from "../../../services";
import { Comment, Comments, CommentPostArgs, GetPostCommentsArgs } from "./types";

@Resolver()
export class CommentResolver {
    @Mutation(() => Comment)
    async commentPost(@Arg('args', () => CommentPostArgs) args: CommentPostArgs, @Ctx() context: any): Promise<Comment | null | undefined> {
        const { user } = context;
        if (args.postId && user._id && args?.content) {
            return commentService.commentPost(user._id, args.postId,  args.content, args.commentId)
        }
    }
    @Query(() => Comments)
    async getComments(@Arg('args', () => GetPostCommentsArgs) args: GetPostCommentsArgs): Promise<Comments | undefined> {
        if (args.postId) {
            return commentService.getPostComments(args.postId) as Comments;
        }
        return undefined;
    }

}