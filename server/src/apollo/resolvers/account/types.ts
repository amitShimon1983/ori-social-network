import { ObjectType, ID, Field } from "type-graphql";

@ObjectType()
export class User {
    @Field(() => ID)
    _id?: string;
    @Field(() => String)
    name?: string;
    @Field(() => String)
    email?: string;
    @Field(() => String)
    avatar?: string;
}