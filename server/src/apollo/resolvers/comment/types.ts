import { Field, ObjectType, InputType } from "type-graphql";

@ObjectType()
export class Comment {
    @Field(() => String)
    user?: string;
    @Field(() => String)
    post?: string;
    @Field(() => String)
    commentId?: string;
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