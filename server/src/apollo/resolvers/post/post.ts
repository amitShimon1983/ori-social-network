import { Resolver, Query, Ctx } from "type-graphql";
import { postService } from "../../../services";
import { Post, Posts } from "./types";

@Resolver()
export class PostResolver {
    @Query(() => Posts)
    async getRandomPosts(@Ctx() context: any): Promise<Posts> {
        const { user } = context;
        return postService.getRandomPosts(user._id) as Posts
    }
}