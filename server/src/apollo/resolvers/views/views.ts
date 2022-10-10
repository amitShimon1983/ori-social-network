import { Resolver, Mutation, Arg, Ctx} from "type-graphql";
import { viewsService } from "../../../services";
import {  GetPostViewsArgs } from "./types";


@Resolver()
export class ViewsResolver {
   
    @Mutation(() => Boolean)
    async getViews(@Arg('args', () => GetPostViewsArgs) args: GetPostViewsArgs, @Ctx() context: any): Promise<boolean> {
        const { user } = context;
        if (args.postId && user._id) {
             viewsService.addViewedPosts(args.postId, user._id);
        }
        return true;
    }
}
