import { Resolver, Query, Mutation, Ctx, Arg } from "type-graphql";
import { userService } from "../../../services";
import { FollowArgs, GetUserArgs, User, SearchContactsArgs } from "./types";

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
      followers: dbUser.followers,
      following: dbUser.following,
    } as User;
  }
  @Query(() => User)
  async getUser(
    @Arg("args", () => GetUserArgs) args: GetUserArgs
  ): Promise<User> {
    const dbUser = await userService.findOne(args.userId);
    return {
      name: dbUser?.name,
      email: dbUser?.email,
      _id: dbUser?._id,
      file: {
        originalname: dbUser ? dbUser?.file?.originalname : "",
      },
      followers: dbUser.followers,
      following: dbUser.following,
      lastSeen: dbUser.lastSeen,
    } as User;
  }
  @Mutation(() => User)
  async follow(
    @Arg("args", () => FollowArgs) args: FollowArgs,
    @Ctx() context: any
  ): Promise<User | null> {
    const dbUser = await userService.follow(context.user._id, args.userId);
    if (dbUser) {
      return {
        name: dbUser?.name,
        email: dbUser?.email,
        _id: dbUser?._id,
        followers: dbUser?.followers,
        following: dbUser?.following,
      } as User;
    }
    return null;
  }
  @Mutation(() => User)
  async unFollow(
    @Arg("args", () => FollowArgs) args: FollowArgs,
    @Ctx() context: any
  ): Promise<User | null> {
    const dbUser = await userService.unFollow(context.user._id, args.userId);
    if (dbUser) {
      return {
        name: dbUser?.name,
        email: dbUser?.email,
        _id: dbUser?._id,
        followers: dbUser?.followers,
        following: dbUser?.following,
      } as User;
    }
    return null;
  }

  @Query(() => [User])
  async searchContacts(
    @Arg("args", () => SearchContactsArgs) args: SearchContactsArgs,
    @Ctx() context: any
  ) {
    const { user } = context;
    const { queryString } = args;
    if (queryString) {
      return userService.searchContacts(user, queryString);
    }
    return [];
  }

  @Mutation(() => Boolean)
  async updateUserStatus(@Ctx() context: any): Promise<boolean> {
    await userService.updateUserConnectionStatus(context.user._id);
    return true;
  }
}
