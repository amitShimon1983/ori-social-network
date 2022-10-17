import { Schema, model } from "mongoose";
import { IReaction } from "./types";

const ReactionSchema = new Schema<IReaction>({
    emoji: String,
});

const ReactionModel = model<IReaction>('Reaction', ReactionSchema);

export default ReactionModel;