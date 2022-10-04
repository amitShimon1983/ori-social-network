import { Arg, Args, Field, InputType, Int, Mutation, ObjectType, PubSub, PubSubEngine, Resolver, Root, Subscription } from "type-graphql";
@InputType()
export class NotificationA {
    @Field(() => String, { nullable: true })
    message?: string;

}
@ObjectType()
export class NotificationO {
    @Field(() => String, { nullable: true })
    message?: string;
    @Field(() => String, { nullable: true })
    date?: Date;
}


@Resolver()
export class SampleResolver {
    @Subscription(() => NotificationO, {
        topics: "NOTIFICATIONS",
        filter: ({ payload, args, context }) => {
            console.log({ payload, args, context });
            return args.priorities.includes(payload.priority)
        },
    })
    newNotification(
        @Root() notificationPayload: NotificationA,
        // @Args() args: any,
    ): NotificationO {
        return {
            ...notificationPayload,
            date: new Date(),
        };
    }
    @Mutation(() => Boolean)
    async addNewComment(@PubSub() pubSub: PubSubEngine) {
        // here we can trigger subscriptions topics
        const payload: any = { message: "input.content" };
        await pubSub.publish("NOTIFICATIONS", payload);
        return true;
    }
}