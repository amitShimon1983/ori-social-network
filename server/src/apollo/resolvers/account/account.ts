import { Resolver, Query, Ctx } from "type-graphql";
import { userService } from "../../../services";
import { User } from "./types";

@Resolver()
export class AccountResolver {
    @Query(() => User)
    async getAccount(@Ctx() context: any): Promise<User> {
        const { user } = context;
        const dbUser = await userService.findOneIfExists(user.email);
        return {
            name: dbUser?.name,
            email: dbUser?.email,
            _id: dbUser?._id,
            avatar: dbUser?.avatar

        } as User
    }
}