import { model, Schema } from "mongoose";
import { IUserReaction } from "./types";

export const UserReactionSchema = new Schema<IUserReaction>({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    reaction: { type: Schema.Types.ObjectId, ref: 'Reaction' }
});
const UserReactionModel = model<IUserReaction>('UserReaction', UserReactionSchema);
export default UserReactionModel;