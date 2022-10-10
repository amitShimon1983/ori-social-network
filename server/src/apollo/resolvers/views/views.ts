import { Resolver, Mutation, Arg, Ctx, Query} from "type-graphql";
import { viewsService } from "../../../services";
import {  AddPostViewsArgs } from "./types";


@Resolver()
export class ViewsResolver {
   
    @Mutation(() => Boolean)
    async addViews(@Arg('args', () => AddPostViewsArgs) args: AddPostViewsArgs, @Ctx() context: any): Promise<boolean> {
        const { user } = context;
        if (args.postId && user._id) {
             viewsService.addViewedPosts(args.postId, user._id);
        }
        return true;
    }
}
