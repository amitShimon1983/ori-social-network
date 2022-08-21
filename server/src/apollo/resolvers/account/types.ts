import { ObjectType, ID, Field } from "type-graphql";
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