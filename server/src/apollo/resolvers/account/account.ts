import { Resolver, Query, Ctx, Arg } from "type-graphql";
import { userService } from "../../../services";
import { GetUserArgs, User } from "./types";

@Resolver()
export class AccountResolver {
    @Query(() => User)
    async getAccount(@Ctx() context: any): Promise<User> {
        const { user } = context;
        const dbUser = await userService.findOne(user._id);
        return {
            name: dbUser?.name,
            email: dbUser?.email,
            _id: dbUser?._id,
        } as User
    }
    @Query(() => User)
    async getUser(@Arg('args', () => GetUserArgs) args: GetUserArgs): Promise<User> {
        const dbUser = await userService.findOne(args.userId);
        return {
            name: dbUser?.name,
            email: dbUser?.email,
            _id: dbUser?._id,
            file: {
                originalname: dbUser ? dbUser?.file?.originalname : ''
            }
        } as User
    }
}