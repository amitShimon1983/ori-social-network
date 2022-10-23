import { Field, InputType, ObjectType } from "type-graphql";
import { User } from "../account/types";

@InputType()
export class StartCallArgs {
    @Field(() => String)
    addressee: string;
    @Field(() => String)
    sdp: string;
}
@InputType()
export class SendIceCandidateArgs {
    @Field(() => String)
    addressee: string;
    @Field(() => String)
    icecandidate: string;
}
@ObjectType()
export class IceCandidate {
    @Field(() => String)
    addressee: string;
    @Field(() => String)
    caller: string;
    @Field(() => String)
    icecandidate: string;
}
@ObjectType()
export class CallDetails {
    @Field(() => String)
    addressee: string;
    @Field(() => String)
    sdp: string;
    @Field(() => String)
    caller: string;
}
@ObjectType()
export class StartCallDetails {
    @Field(() => String)
    addressee: string;
    @Field(() => String)
    sdp: string;
    @Field(() => User)
    caller: User;
}
@InputType()
export class AnswerCallArgs {
    @Field(() => String)
    addressee: string;
    @Field(() => String)
    sdp: string;
}