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
}

@InputType()
export class GetUserArgs{
    @Field(() => String)
    userId: string;
}