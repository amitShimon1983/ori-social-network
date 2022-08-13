import { model, Schema } from "mongoose";
import { IComment } from "./type";

const commentSchema = new Schema<IComment>({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
});

const CommentModel = model<IComment>('Comment', commentSchema);

export default CommentModel;