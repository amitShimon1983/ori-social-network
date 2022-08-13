import { model, Schema } from "mongoose";
import { ILike } from "./type";

const likeSchema = new Schema<ILike>({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
});

const LikeModel = model<ILike>('Like', likeSchema);

export default LikeModel;