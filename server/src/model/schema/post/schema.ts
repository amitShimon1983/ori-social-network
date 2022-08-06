import { model, Schema } from "mongoose";
import { IPost } from "./type";

const postSchema = new Schema<IPost>({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    originalname: { type: String },
    encoding: { type: String },
    mimetype: { type: String },
    filename: { type: String },
    path: { type: String },
    size: { type: Number },
});

const PostModel = model<IPost>('Post', postSchema);

export default PostModel;