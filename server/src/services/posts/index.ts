import { IUser } from "../../model";
import { IFile } from "../../model/schema/file/types";
import PostModel from "../../model/schema/post/schema";
import { IPost } from "../../model/schema/post/types";

export class PostService {
    private static instance: PostService;
    static getInstance() {
        if (!this.instance) {
            this.instance = new PostService();
        }
        return this.instance;
    }
    async getPosts(user?: string) {
        const query = user ? { user } : {}
        const posts = await PostModel.find(query).populate('file').lean();
        return { posts }
    }
    async getPost(postId: string) {
        const post = await PostModel.findOne({ _id: postId });
        return { post }
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