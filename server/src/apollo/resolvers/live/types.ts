import { Field, InputType, ObjectType } from "type-graphql";

@InputType()
export class StartCallArgs {
    @Field(() => String)
    addressee: string;
    @Field(() => String)
    sdp: string;
}
@ObjectType()
export class StartCall {
    @Field(() => String)
    addressee: string;
    @Field(() => String)
    sdp: string;
    @Field(() => String)
    caller: string;
}