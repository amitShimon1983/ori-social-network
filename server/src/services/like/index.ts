
import { Types } from "mongoose";
import { LikeModel } from "../../model/schema";

class LikeService {
    static instance?: LikeService;
    static getInstance() {
        if (!this.instance) {
            this.instance = new LikeService();
        }
        return this.instance;
    }
    async likePost(postId: string, userId: string, action: string) {
        const isUserLike = await LikeModel.findOne({ user: new Types.ObjectId(userId), post: new Types.ObjectId(postId) });
        if (action === 'dislike' && isUserLike) {
            await isUserLike.remove();
        } else if (!isUserLike && action === 'like') {
            const like = (await LikeModel.create({ user: new Types.ObjectId(userId), post: new Types.ObjectId(postId) })).toObject()
            return like;
        }
    }
    async getPostLikes(postId: string) {
        return { likes: await LikeModel.find({ post: new Types.ObjectId(postId) }).lean() };
    }
}

export default LikeService.getInstance()