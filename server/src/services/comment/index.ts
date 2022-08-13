
import { Types } from "mongoose";
import { CommentModel, IComment } from "../../model/schema";

class CommentService {
    static instance?: CommentService;
    static getInstance() {
        if (!this.instance) {
            this.instance = new CommentService();
        }
        return this.instance;
    }
    async commentPost(userId: string, postId: string, content: string, commentId?: string) {
        const newComment: IComment = {
            user: userId,
            post: postId,
            content
        }
        if (commentId) {
            const dbComment = await CommentModel.findOne({
                user: new Types.ObjectId(userId),
                post: new Types.ObjectId(postId),
                _id: new Types.ObjectId(commentId)
            });
            if (dbComment) {
                newComment.comment = dbComment._id.toString()
            }

        }
        return await CommentModel.create(newComment) as IComment

    }
    async getPostComments(postId: string, commentId?: string) {
        return {
            comments: await CommentModel.find({
                post: new Types.ObjectId(postId),
                comment: new Types.ObjectId(commentId)
            })
        }
    }
}

export default CommentService.getInstance()