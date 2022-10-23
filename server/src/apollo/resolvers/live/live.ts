import { Arg, Ctx, Mutation, Resolver, Root, Subscription } from "type-graphql";
import { AppContext, UserModel } from "../../../model";
import { ON_CALL_ANSWER, ON_CALL_START, ON_ICE_CANDIDATE } from "../../../utils";
import { CallDetails, IceCandidate, SendIceCandidateArgs, StartCallArgs, StartCallDetails } from "./types";


@Resolver()
export class LiveResolver {

    @Subscription(() => IceCandidate, {
        topics: [ON_ICE_CANDIDATE],
        filter: ({ payload, context }: { payload: IceCandidate, context: AppContext }) => {
            const { user } = context;
            return (payload?.addressee === user.email)
        }
    })
    async onIceCandidate(@Root() payload: IceCandidate): Promise<IceCandidate> {
        return payload;
    }
    @Subscription(() => StartCallDetails, {
        topics: [ON_CALL_START],
        filter: ({ payload, context }: { payload: StartCallDetails, context: AppContext }) => {
            const { user } = context;
            return (payload?.addressee === user.email)
        }
    })
    async onCallStart(@Root() payload: StartCallDetails): Promise<StartCallDetails> {
        return payload;
    }

    @Subscription(() => CallDetails, {
        topics: [ON_CALL_ANSWER],
        filter: ({ payload, context }: { payload: CallDetails, context: AppContext }) => {
            const { user } = context;
            return (payload?.addressee === user.email)
        }
    })

    async onCallAnswer(@Root() payload: CallDetails): Promise<CallDetails> {
        return payload;
    }

    @Mutation(() => Boolean)
    async startCall(@Arg('args', () => StartCallArgs) args: StartCallArgs, @Ctx() context: AppContext) {
        const { user, pubSub } = context;
        const userDb = await UserModel.findOne({ email: args.addressee })
        if (userDb) {
            pubSub.publish(ON_CALL_START, {
                caller: user,
                ...args
            });
        }
        return true;
    }

    @Mutation(() => Boolean)
    async answerCall(@Arg('args', () => StartCallArgs) args: StartCallArgs, @Ctx() context: AppContext) {
        const { user, pubSub } = context;
        const userDb = await UserModel.findOne({ email: args.addressee })
        if (userDb) {
            pubSub.publish(ON_CALL_ANSWER, {
                caller: user.email,
                ...args
            });
        }
        return true;
    }
    @Mutation(() => Boolean)
    async sendIceCandidate(@Arg('args', () => SendIceCandidateArgs) args: SendIceCandidateArgs, @Ctx() context: AppContext) {
        const { user, pubSub } = context;
        const userDb = await UserModel.findOne({ email: args.addressee })
        if (userDb) {
            pubSub.publish(ON_ICE_CANDIDATE, {
                caller: user.email,
                ...args
            });
        }
        return true;
    }
}