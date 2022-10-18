import { Arg, Ctx, Mutation, Resolver, Root, Subscription } from "type-graphql";
import { AppContext, UserModel } from "../../../model";
import { ON_CALL_START } from "../../../utils";
import { StartCall, StartCallArgs } from "./types";


@Resolver()
export class LiveResolver {
    @Subscription(() => StartCall, {
        topics: [ON_CALL_START],
        filter: ({ payload, context }) => {
            const { user } = context;
            return (payload?.addressee === user.email)
        }
    })
    async onCallStart(@Root() payload: StartCall): Promise<StartCall> {
        return payload;
    }

    @Mutation(() => Boolean)
    async startCall(@Arg('args', () => StartCallArgs) args: StartCallArgs, @Ctx() context: AppContext) {
        const { user, pubSub } = context;
        const userDb = await UserModel.findOne({ email: args.addressee })
        if (userDb) {
            pubSub.publish(ON_CALL_START, {
                caller: user.email,
                ...args
            });
        }
        return true;
    }
}