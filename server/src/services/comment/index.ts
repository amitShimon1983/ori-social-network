
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
                post: new Types.ObjectId(postId),
                _id: new Types.ObjectId(commentId)
            });
            if (dbComment) {
                newComment.comment = dbComment._id.toString();
                if (dbComment.comments) {
                    dbComment.comments.push(dbComment._id)
                } else {
                    dbComment.comments = [dbComment._id];
                }
                await dbComment.save()
            }
        }
        const createdComment = await (await CommentModel.create(newComment)).populate({
            path: 'user',
            populate: {
                path: 'file'
            }
        });

        return createdComment.toObject();
    }
    async getPostComments(postId: string, commentId?: string) {
        const query =
            { post: new Types.ObjectId(postId), comment: (!!commentId ? new Types.ObjectId(commentId) : commentId) }

        const comments = await CommentModel.find(query).populate({
            path: 'user',
            populate: {
                path: 'file'
            }
        }).lean();
        return { comments }
    }
}

export default CommentService.getInstance()