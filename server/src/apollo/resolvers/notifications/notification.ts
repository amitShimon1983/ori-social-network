import { Field, InputType, ObjectType, Resolver, Root, Subscription } from "type-graphql";
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
            //check if current user is one of owners
            return true
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
}