import { model, Schema } from "mongoose";
import { IPost } from "./types";

const postSchema = new Schema<IPost>({
    file: { type: Schema.Types.ObjectId, ref: 'File' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    title: String,
    createdAt: { type: Date, default: new Date() }
});

const PostModel = model<IPost>('Post', postSchema);

export default PostModel;