import { Arg, Mutation, Query, Resolver, Ctx, Subscription, Root } from "type-graphql";
import { AppContext, IUser } from "../../../model";
import { messageService } from "../../../services";
import { ON_MESSAGE_UPDATE, ON_NEW_MESSAGE_CREATED, ON_NEW_MESSAGE_THREAD_CREATED } from "../../../utils";
import { GetConversation, GetConversationArgs, GetMessageThreads, GetMessageThreadsArgs, Message, MessageThread, SendMessageArgs, UpdateMessageArgs } from "./types";

@Resolver()
export class MessageResolver {
    @Mutation(() => Message)
    async sendMessage(@Arg('args', () => SendMessageArgs) args: SendMessageArgs, @Ctx() context: AppContext) {
        const { user, pubSub } = context;
        if (user._id) { return messageService.sendMessage(args, user._id, pubSub); } return null;
    }
    @Mutation(() => Message)
    async updateMessage(@Arg('args', () => UpdateMessageArgs) args: UpdateMessageArgs, @Ctx() context: AppContext) {
        const { user, pubSub } = context;
        if (user._id) { return messageService.updateMessage(args, user._id, pubSub) } return null;
    }
    @Query(() => GetMessageThreads)
    async getMessageThreads(@Arg('args', () => GetMessageThreadsArgs) args: GetMessageThreadsArgs, @Ctx() context: AppContext) {
        const { user } = context;
        const { skip, limit } = args;
        if (user._id) {
            const threads = messageService.getMessages(user._id, skip, limit);
            return threads;
        }
        return null
    }
    @Query(() => GetConversation)
    async getConversation(@Arg('args', () => GetConversationArgs) args: GetConversationArgs, @Ctx() context: AppContext) {
        const { user } = context;
        const { skip, limit, messageThreadId, ownerId } = args;
        if (user._id) {
            const threads = messageService.getConversation(user._id, messageThreadId, ownerId, skip, limit);
            return threads;
        } return null;
    }

    @Subscription(() => MessageThread, {
        topics: [ON_NEW_MESSAGE_THREAD_CREATED],
        filter: ({ payload, context }) => {
            const { user } = context;
            const owner = payload?.owners?.find((owner: IUser) => {
                return owner?._id?.toString() === user?._id
            })
            return !!owner
        }
    })
    async newMessageThread(@Root() newThreadPayload: MessageThread): Promise<MessageThread> {
        return newThreadPayload;
    }

    @Subscription(() => MessageThread, {
        topics: [ON_NEW_MESSAGE_CREATED],
        filter: ({ payload, context }) => {
            const { user } = context;
            const owner = payload?.owners?.find((owner: IUser) => {
                return owner?._id?.toString() === user?._id
            })
            const message: Message = payload.messages[0]
            return !!owner._id && (message?.sender?._id?.toString?.() !== user._id || message.type !== 'text')
        }
    })
    async newMessage(@Root() newMessagePayload: MessageThread): Promise<MessageThread> {
        return newMessagePayload;
    }

    @Subscription(() => Message, {
        topics: [ON_MESSAGE_UPDATE],
        filter: ({ payload, context }) => {
            const { user } = context;
            return (payload?.sender?._id?.toString?.() === user._id)
        }
    })
    async onMessageUpdate(@Root() newMessagePayload: Message): Promise<Message> {
        return newMessagePayload;
    }
}