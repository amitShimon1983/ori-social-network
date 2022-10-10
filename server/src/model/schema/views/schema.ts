import { model, Schema } from "mongoose";
import { IViews } from "./types";

const ViewsSchema = new Schema<IViews>({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    post: { type: Schema.Types.ObjectId, ref: 'Post' },
},{timestamps: true});

const ViewsModel = model<IViews>('Views', ViewsSchema);

export default ViewsModel;