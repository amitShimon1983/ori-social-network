import { ObjectType, Field } from "type-graphql";
import { IMessage } from "../../../model/schema/message";

@ObjectType()
export class GetMessages {
    @Field(() => [Message], { nullable: true })
    messages: Message[];
}

export class Message implements IMessage {
    @Field(() => Boolean)
    isRead: boolean;
    @Field(() => String)
    _id: string;
    @Field(() => String)
    sender?: string | undefined;
    @Field(() => String)
    recipient?: string | undefined;
    @Field(() => String)
    content: string;
    @Field(() => String)
    createdAt: Date;
}