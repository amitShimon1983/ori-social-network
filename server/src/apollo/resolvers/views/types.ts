import {  Field, InputType } from "type-graphql";

@InputType()
export class AddPostViewsArgs {
    @Field(() => String)
    postId?: string;
}
