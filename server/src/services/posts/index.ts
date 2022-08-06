import PostModel from "../../model/schema/post/schema";

export class PostService {
    private static instance: PostService;
    static getInstance() {
        if (!this.instance) {
            this.instance = new PostService();
        }
        return this.instance;
    }
    async getRandomPosts(userId: string) {
        const posts = await PostModel.find({ userId }).lean();
        return { posts } 
    }
}

export default PostService.getInstance();