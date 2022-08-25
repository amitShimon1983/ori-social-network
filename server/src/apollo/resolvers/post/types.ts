import { ObjectType, Field, ID, InputType } from "type-graphql";
@ObjectType()
export class File {
    @Field(() => ID)
    _id?: string;
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
export class Post {
    @Field(() => ID)
    _id?: string;
    @Field(() => String)
    user?: string;
    @Field(() => String)
    title?: string;
    @Field(() => String)
    createdAt?: string;
    @Field(() => File)
    file?: File;
}

@ObjectType()
export class Posts {
    @Field(() => [Post])
    posts?: Post[];
}

@InputType()
export class GetOtherPosts {
    @Field(() => String)
    userId: string;
}
