import { ObjectType, Int, Field, InputType } from "type-graphql";
import { IMessage } from "../../../model/schema/message";

@ObjectType()
export class GetMessages {
    @Field(() => [Message], { nullable: true })
    threads: Message[];
    @Field(() => Int, { nullable: true })
    count: number;
    @Field(() => Boolean, { nullable: true })
    hasMore: boolean;
}
@InputType()
export class GetMessagesArgs {
    @Field(() => Int, { nullable: true })
    skip?: number;
    @Field(() => Int, { nullable: true })
    limit?: number;
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