import { model, Schema } from "mongoose";
import { IPost } from "./type";

const postSchema = new Schema<IPost>({
    file: { type: Schema.Types.ObjectId, ref: 'File' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    likes: { type: Schema.Types.ObjectId, ref: 'Like' },
    comments: { type: Schema.Types.ObjectId, ref: 'Comment' },
    title: String,
    createdAt: { type: Date, default: new Date() }
});

const PostModel = model<IPost>('Post', postSchema);

export default PostModel;