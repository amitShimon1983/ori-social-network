import {  Field, InputType } from "type-graphql";

@InputType()
export class GetPostViewsArgs {
    @Field(() => String)
    postId?: string;
}
