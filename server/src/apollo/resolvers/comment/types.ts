import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Comment {
    @Field(() => String)
    user?: string;
    @Field(() => String)
    post?: string;
}
@ObjectType()
export class Comments {
    @Field(() => Comment)
    comments?: Comment[]
}