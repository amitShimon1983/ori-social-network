import { Field, ID, ObjectType } from "type-graphql";
@ObjectType()
export class Reaction {
    @Field(() => String)
    emoji: string;
    @Field(() => ID)
    _id: string;
}
@ObjectType()
export class Reactions {
    @Field(() => [Reaction])
    reactions: Reaction[]
}