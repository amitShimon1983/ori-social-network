import { Arg, Mutation, Query, Resolver, Ctx } from "type-graphql";
import { messageService } from "../../../services";
import { GetConversation, GetConversationArgs, GetMessageThreads, GetMessageThreadsArgs, SendMessageArgs } from "./types";

@Resolver()
export class MessageResolver {
    @Mutation(() => Boolean)
    async sendMessage(@Arg('args', () => SendMessageArgs) args: SendMessageArgs, @Ctx() context: any) {
        const { user } = context;
        await messageService.sendMessage(args, user._id)
        return true;
    }
    @Query(() => GetMessageThreads)
    async getMessageThreads(@Arg('args', () => GetMessageThreadsArgs) args: GetMessageThreadsArgs, @Ctx() context: any) {
        const { user } = context;
        const { skip, limit } = args;
        const threads = await messageService.getMessages(user._id, skip, limit);
        return threads;
    }
    @Query(() => GetConversation)
    async getConversation(@Arg('args', () => GetConversationArgs) args: GetConversationArgs, @Ctx() context: any) {
        const { user } = context;
        const { skip, limit, messageThreadId } = args;
        const threads = await messageService.getConversation(user._id, messageThreadId, skip, limit);
        return threads;
    }
}