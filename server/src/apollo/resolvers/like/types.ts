import { ObjectType, Field, ID, InputType } from "type-graphql";

@ObjectType()
export class Like {
    @Field(() => ID)
    _id?: string;
    @Field(() => String)
    user?: string;
    @Field(() => String)
    Post?: string;
}
@ObjectType()
export class Likes {
    @Field(() => [Like])
    likes?: Like[]
}
@InputType()
export class LikePostArgs {
    @Field(() => ID)
    postId?: string;
    @Field(() => String)
    action?:string;
}
@InputType()
export class GetPostLikesArgs {
    @Field(() => ID)
    postId?: string;
}