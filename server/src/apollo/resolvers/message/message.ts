import { Mutation, Query, Resolver, Ctx } from "type-graphql";

@Resolver()
export class MessageResolver {
    @Mutation(() => Boolean)
    async sendMessage() {
        return true;
    }
    @Query(() => [Boolean])
    async getMessages(@Ctx() context: any) {
        const { user } = context;
        return false;
    }
}