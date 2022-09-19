import { Arg, Mutation, Query, Resolver, Ctx } from "type-graphql";
import { messageService } from "../../../services";
import { GetConversation, GetConversationArgs, GetMessageThreads, GetMessageThreadsArgs, Message, SendMessageArgs } from "./types";

@Resolver()
export class MessageResolver {
    @Mutation(() => Message)
    async sendMessage(@Arg('args', () => SendMessageArgs) args: SendMessageArgs, @Ctx() context: any) {
        const { user } = context;
        return messageService.sendMessage(args, user._id);
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
}