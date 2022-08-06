import { Resolver, Query, Ctx } from "type-graphql";
import { Post, Posts } from "./types";

@Resolver()
export class PostResolver {
    @Query(() => Posts)
    async getRandomPosts(@Ctx() context: any): Promise<Posts> {
        return { posts: [new Post()] }
    }
}