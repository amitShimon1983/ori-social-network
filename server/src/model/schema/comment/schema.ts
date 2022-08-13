import { model, Schema } from "mongoose";
import { IComment } from "./types";

const commentSchema = new Schema<IComment>({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    post: { type: Schema.Types.ObjectId, ref: 'Post' },
    content: String,
    comment: { type: Schema.Types.ObjectId, ref: 'Comment' }
});

const CommentModel = model<IComment>('Comment', commentSchema);

export default CommentModel;