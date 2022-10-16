import { IReaction, ReactionModel } from "../../../model"
const reactions: IReaction[] = [
    { emoji: '❤️', },
    { emoji: '😆', },
    { emoji: '😯', },
    { emoji: '😢', },
    { emoji: '😡', },
    { emoji: '👍', },
    { emoji: '👎', }
];
export const seedDb = async () => {
    const seedReactions = async () => {
        const isExists = await ReactionModel.find({})
        if (!isExists?.length) {
            await ReactionModel.create(reactions)
        }
    }
    await seedReactions();
}