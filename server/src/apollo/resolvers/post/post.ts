import { Resolver, Query, Ctx } from "type-graphql";
import { postService } from "../../../services";
import {  Posts } from "./types";

@Resolver()
export class PostResolver {
    @Query(() => Posts)
    async getRandomPosts(@Ctx() context: any): Promise<Posts> {
        const { user } = context;
        return postService.getRandomPosts(user._id) as Posts
    }
    @Mutation(() => Posts)
    async postLike(@Ctx() context: any): Promise<Posts> {
        const { user } = context;
        return postService.getRandomPosts(user._id) as Posts
    }
}