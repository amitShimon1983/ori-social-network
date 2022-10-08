import { ObjectType, Int, Field, InputType } from "type-graphql";
import { User } from "../account/types";
import { File } from "../post/types";

@ObjectType()
export class GetMessageThreads {
    @Field(() => [MessageThread], { nullable: true })
    threads: MessageThread[];
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
@ObjectType()
export class GetConversation {
    @Field(() => [Message], { nullable: true })
    messages: Message[];
    @Field(() => Int, { nullable: true })
    count: number;
    @Field(() => Boolean, { nullable: true })
    hasMore: boolean;
}
@InputType()
export class GetConversationArgs {
    @Field(() => String, { nullable: true })
    messageThreadId?: string;
    @Field(() => String, { nullable: true })
    ownerId?: string;
    @Field(() => Int, { nullable: true })
    skip?: number;
    @Field(() => Int, { nullable: true })
    limit?: number;
}
@InputType()
export class UpdateMessageArgs {
    @Field(() => String)
    id: string;
    @Field(() => Boolean)
    isRead: boolean;
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
    @Field(() => String, { nullable: true })
    type?: string;
    @Field(() => String, { nullable: true })
    file?: string;
}

@ObjectType()
export class MessageThread {
    @Field(() => String)
    _id: string;
    @Field(() => Int)
    unreadMessages: number;
    @Field(() => [Message], { nullable: true })
    messages: Message[];
    @Field(() => [User], { nullable: true })
    owners: User[];
}
@ObjectType()
export class Message {
    @Field(() => Boolean)
    isRead: boolean;
    @Field(() => String)
    _id: string;
    @Field(() => Message)
    parentMessageId?: Message;
    @Field(() => User)
    sender?: User;
    @Field(() => User)
    recipient?: User;
    @Field(() => String)
    content: string;
    @Field(() => String)
    type: string;
    @Field(() => File)
    file?: File;
    @Field(() => String)
    createdAt: Date;
    @Field(() => String)
    messageThreadId: string;
}