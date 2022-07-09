import { Resolver, Query, Ctx } from "type-graphql";
import { userService } from "../../../services";

@Resolver()
export class Account {
    @Query(() => String)
    async getAccount(@Ctx() context: any) {
        const { user } = context;
        return await userService.findOneIfExists(user.email)
    }
}