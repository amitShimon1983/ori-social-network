import { AuthenticationError } from "apollo-server-express";
import { Resolver, Query, Mutation, Ctx, Arg } from "type-graphql";
import { AppContext } from "../../../model";
import { userService } from "../../../services";
import { FollowArgs, GetUserArgs, User, SearchContactsArgs } from "./types";

@Resolver()
export class AccountResolver {
  @Query(() => User)
  async getAccount(@Ctx() context: AppContext): Promise<User> {
    const { user } = context;
    if (user._id) {
      const dbUser = await userService.findOne(user._id);
      return {
        name: dbUser?.name,
        email: dbUser?.email,
        _id: dbUser?._id,
        followers: dbUser.followers,
        following: dbUser.following,
      } as User;
    }
    throw new AuthenticationError('UNAUTHENTICATED');
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
    @Ctx() context: AppContext
  ): Promise<User | null> {
    const { user } = context;
    if (user?._id) {
      const dbUser = await userService.follow(user._id, args.userId);
      if (dbUser) {
        return {
          name: dbUser?.name,
          email: dbUser?.email,
          _id: dbUser?._id,
          followers: dbUser?.followers,
          following: dbUser?.following,
        } as User;
      }
    }
    return null;
  }
  @Mutation(() => User)
  async unFollow(
    @Arg("args", () => FollowArgs) args: FollowArgs,
    @Ctx() context: AppContext
  ): Promise<User | null> {
    const { user } = context;
    if (user?._id) {
      const dbUser = await userService.unFollow(user._id, args.userId);
      if (dbUser) {
        return {
          name: dbUser?.name,
          email: dbUser?.email,
          _id: dbUser?._id,
          followers: dbUser?.followers,
          following: dbUser?.following,
        } as User;
      }
    }
    return null;
  }

  @Query(() => [User])
  async searchContacts(
    @Arg("args", () => SearchContactsArgs) args: SearchContactsArgs,
    @Ctx() context: AppContext
  ) {
    const { user } = context;
    const { queryString } = args;
    if (queryString) {
      return userService.searchContacts(user, queryString);
    }
    return [];
  }

  @Mutation(() => Boolean)
  async updateUserStatus(@Ctx() context: AppContext): Promise<boolean> {
    const { user } = context;
    if (user._id) {
      return !!userService.updateUserConnectionStatus(user._id);
    }
    return false;
  }
}
