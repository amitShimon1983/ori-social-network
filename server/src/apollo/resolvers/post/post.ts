import { Resolver, Query, Ctx } from "type-graphql";
import { postService } from "../../../services";
import { Posts } from "./types";

@Resolver()
export class PostResolver {
    @Query(() => Posts)
    async getRandomPosts(): Promise<Posts> {
        return postService.getPosts() as Posts
    }
    @Query(() => Posts)
    async getMyPosts(@Ctx() context: any): Promise<Posts> {
        const { user } = context;
        return postService.getPosts(user._id) as Posts
    }
}