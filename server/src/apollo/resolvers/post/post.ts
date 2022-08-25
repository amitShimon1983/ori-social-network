import { Resolver, Query, Arg } from "type-graphql";
import { postService } from "../../../services";
import { GetOtherPosts, Posts } from "./types";

@Resolver()
export class PostResolver {
    @Query(() => Posts)
    async getRandomPosts(): Promise<Posts> {
        return postService.getPosts() as Posts
    }

    @Query(() => Posts)
    async getMyPosts(@Arg('args', () => GetOtherPosts) args: GetOtherPosts): Promise<Posts> {
        return postService.getPosts(args.userId) as Posts
    }
}