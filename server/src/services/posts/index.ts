import { IUser } from "../../model";
import { IFile } from "../../model/schema/file/type";
import PostModel from "../../model/schema/post/schema";
import { IPost } from "../../model/schema/post/type";

export class PostService {
    private static instance: PostService;
    static getInstance() {
        if (!this.instance) {
            this.instance = new PostService();
        }
        return this.instance;
    }
    async getRandomPosts(user: string) {
        const posts = await PostModel.find({ user }).populate('file').lean();
        return { posts }
    }
    async savePosts(files: IFile[], user: IUser) {
        const post: IPost = {
            title: 'no title',
            file: files[0]._id,
            user: user._id
        }
        await PostModel.insertMany([post])
    }
}

export default PostService.getInstance();