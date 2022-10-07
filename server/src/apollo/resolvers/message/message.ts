import { Arg, Mutation, Query, Resolver, Ctx, Subscription, Root, PubSubEngine, PubSub } from "type-graphql";
import { messageService } from "../../../services";
import { GetConversation, GetConversationArgs, GetMessageThreads, GetMessageThreadsArgs, Message, MessageThread, SendMessageArgs, UpdateMessageArgs } from "./types";

@Resolver()
export class MessageResolver {
    @Mutation(() => Message)
    async sendMessage(@Arg('args', () => SendMessageArgs) args: SendMessageArgs, @Ctx() context: any) {
        const { user, pubSub } = context;
        return messageService.sendMessage(args, user._id, pubSub);
    }
    @Mutation(() => Message)
    async updateMessage(@Arg('args', () => UpdateMessageArgs) args: UpdateMessageArgs, @Ctx() context: any) {
        const { user } = context;
        return messageService.updateMessage(args, user._id);
    }
    @Query(() => GetMessageThreads)
    async getMessageThreads(@Arg('args', () => GetMessageThreadsArgs) args: GetMessageThreadsArgs, @Ctx() context: any) {
        const { user } = context;
        const { skip, limit } = args;
        const threads = messageService.getMessages(user._id, skip, limit);
        return threads;
    }
    @Query(() => GetConversation)
    async getConversation(@Arg('args', () => GetConversationArgs) args: GetConversationArgs, @Ctx() context: any) {
        const { user } = context;
        const { skip, limit, messageThreadId } = args;
        const threads = messageService.getConversation(user._id, messageThreadId, skip, limit);
        return threads;
    }
    @Subscription(() => MessageThread, {
        topics: 'NEW_MESSAGE_THREAD',
        filter: ({ payload, context }) => {
            const { user } = context;
            const owner = payload?.owners?.find((owner: any) => {
                return owner?._id?.toString() === user?._id
            })
            return !!owner
        }
    })
    async newMessageThread(@Root() newThreadPayload: MessageThread): Promise<MessageThread> {
        return newThreadPayload;
    }
}