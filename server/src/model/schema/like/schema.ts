import { model, Schema } from "mongoose";
import { ILike } from "./types";

const likeSchema = new Schema<ILike>({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    post: { type: Schema.Types.ObjectId, ref: 'Post' },
});

const LikeModel = model<ILike>('Like', likeSchema);

export default LikeModel;