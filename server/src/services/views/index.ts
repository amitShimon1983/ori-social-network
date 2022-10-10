
import { Types } from "mongoose";
import { PostModel, ViewsModel } from "../../model/schema";

class ViewsService {
    static instance?: ViewsService;
    static getInstance() {
        if (!this.instance) {
            this.instance = new ViewsService();
        }
        return this.instance;
    }

    async addViewedPosts(postId: string, userId: string) {
       const user = new Types.ObjectId(userId);
       const post = new Types.ObjectId(postId);
       const viewed =  await ViewsModel.findOne({ user, post}).lean();
       if(viewed?._id) {
        return ;
       } else {
        const postDB = await PostModel.findOne({_id: post})
        if (postDB?._id) {
           const addView = await ViewsModel.create({post: postDB?._id, user});
           !!postDB.views?.length ? postDB.views?.push(addView._id) : postDB.views = [addView._id];
           await postDB.save()
        }
       } 
    }
}

export default ViewsService.getInstance()
