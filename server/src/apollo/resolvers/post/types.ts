import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class Post {
    @Field(() => ID)
    _id?: string;
    @Field(() => String)
    userId?: string;
    @Field(() => String)
    originalname?: string;
    @Field(() => String)
    encoding?: string;
    @Field(() => String)
    mimetype?: string;
    @Field(() => String)
    filename?: string;
    @Field(() => String)
    path?: string;
    @Field(() => Number)
    size?: number;
}
@ObjectType()
export class Posts {
    @Field(() => [Post])
    posts?: Post[];
}