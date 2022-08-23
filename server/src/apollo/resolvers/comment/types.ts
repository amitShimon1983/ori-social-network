import { Field, ObjectType, InputType, Int } from "type-graphql";
import { User } from "../account/types";

@ObjectType()
export class Comment {
    @Field(() => String)
    _id?: string;
    @Field(() => User)
    user?: User;
    @Field(() => String)
    post?: string;
    @Field(() => String)
    comment?: string;
    @Field(() => [String])
    comments?: string[];
    @Field(() => String)
    content?: string;
    @Field(() => String)
    updatedAt?: string;
    @Field(() => String)
    createdAt?: string;
}

@ObjectType()
export class Comments {
    @Field(() => [Comment])
    comments?: Comment[];
    @Field(() => Boolean)
    hasMore: boolean;
    @Field(() => Int)
    count: number;
}
@InputType()
export class CommentPostArgs {
    @Field(() => String)
    postId?: string;
    @Field(() => String)
    content?: string;
    @Field(() => String)
    commentId?: string;
}
@InputType()
export class GetPostCommentsArgs {
    @Field(() => String)
    postId?: string;
    @Field(() => String)
    commentId?: string;
    @Field(() => Int)
    skip?: number;
    @Field(() => Int)
    limit?: number;
}