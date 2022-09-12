import { ObjectType, Int, Field, InputType } from "type-graphql";
import { User } from "../account/types";

@ObjectType()
export class GetMessageThreads {
    @Field(() => [Message], { nullable: true })
    threads: Message[];
    @Field(() => Int, { nullable: true })
    count: number;
    @Field(() => Boolean, { nullable: true })
    hasMore: boolean;
}
@InputType()
export class GetMessageThreadsArgs {
    @Field(() => Int, { nullable: true })
    skip?: number;
    @Field(() => Int, { nullable: true })
    limit?: number;
}

@InputType()
export class SendMessageArgs {
    @Field(() => String)
    recipient: string | undefined;
    @Field(() => String)
    content: string;
    @Field(() => String, { nullable: true })
    parentMessageId?: string;
    @Field(() => String, { nullable: true })
    messageThreadId?: string;
}

@ObjectType()
export class Message {
    @Field(() => Boolean)
    isRead: boolean;
    @Field(() => String)
    _id: string;
    @Field(() => String)
    sender?: string | undefined;
    @Field(() => User)
    recipient?: User;
    @Field(() => String)
    content: string;
    @Field(() => String)
    createdAt: Date;
}