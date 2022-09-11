import { ObjectType, ID, Field, InputType } from "type-graphql";
import { File } from '../post/types'
@ObjectType()
export class User {
    @Field(() => ID)
    _id?: string;
    @Field(() => String)
    name?: string;
    @Field(() => String)
    email?: string;
    @Field(() => File)
    file?: File;
    @Field(() => [String])
    followers: string[]
    @Field(() => [String])
    following: string[]
}

@InputType()
export class GetUserArgs {
    @Field(() => String)
    userId: string;
}
@InputType()
export class FollowArgs {
    @Field(() => String)
    userId: string;
}
@InputType()
export class SearchContactsArgs {
    @Field(() => String, { nullable: true })
    queryString?: string;
}