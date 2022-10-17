
import { Query, Resolver } from "type-graphql";
import { ReactionModel } from "../../../model";
import { Reactions } from "./types";

@Resolver()
export class AppMetadata {
    @Query(() => Reactions)
    async getAppReactions(): Promise<Reactions> {
        const reactions = await ReactionModel.find({});
        return { reactions: reactions };
    }
}