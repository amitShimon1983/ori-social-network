import { Field, ObjectType, InputType } from "type-graphql";
import { IComment } from "../../../model/schema";

@ObjectType()
export class Comment implements IComment {
    @Field(() => String)
    _id?: string;
    @Field(() => String)
    user?: string;
    @Field(() => String)
    post?: string;
    @Field(() => String)
    comment?: string;
    @Field(() => String)
    content?: string
    @Field(() => String)
    updatedAt?: string;
    @Field(() => String)
    createdAt?: string
}
@ObjectType()
export class Comments {
    @Field(() => Comment)
    comments?: Comment[]
}
@InputType()
export class CommentPostArgs {
    @Field(() => String)
    postId?: string;
    @Field(() => String)
    content?: string;
    @Field(() => String)
    commentId?: string
}
@InputType()
export class GetPostCommentsArgs {
    @Field(() => String)
    postId?: string;
    @Field(() => String)
    commentId?: string
}