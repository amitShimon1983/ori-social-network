import { Types } from "mongoose";
import { User } from "../../apollo/resolvers/account/types";
import { UserModel } from "../../model";

export class UserService {
    private static instance: UserService;
    static getInstance() {
        if (!UserService.instance) {
            UserService.instance = new UserService()
        }
        return UserService.instance;
    }

    async findOneIfExists(email: string) {
        return await UserModel.findOne({
            email
        }).populate('file').lean()
    }

    async findOne(userId: string) {
        return await UserModel.findOne({
            _id: new Types.ObjectId(userId),
        }).populate('file').lean() as User
    }

    async createUser(name: string, email: string, password: string, file: string) {
        return await UserModel.create({
            name,
            email,
            password,
            file: file || ''
        })
    }
    async follow(me: string, other: string) {
        const meUser = await UserModel.findOne({ _id: new Types.ObjectId(me) });
        const otherUser = await UserModel.findOne({ _id: new Types.ObjectId(other) });
        if (otherUser?._id && meUser?._id) {
            if (otherUser?.followers) {
                if (!otherUser.followers.find(follower => follower === meUser._id)) {
                    otherUser.followers.push(meUser._id);
                }
            } else {
                otherUser.followers = [meUser._id];
            }
            if (meUser?.following) {
                if (!meUser.following.find(follow => follow === otherUser._id)) {
                    meUser.following.push(otherUser._id);
                }
            } else {
                meUser.following = [otherUser._id];
            }
            await meUser.save()
            await otherUser.save()
        }
        return meUser?.toObject();
    }
    async unFollow(me: string, other: string) {
        const meUser = await UserModel.findOneAndUpdate(
            { _id: me },
            {
                $pull:
                {
                    following: { _id: other }
                }
            },
            {
                new: true
            }
        )
        await UserModel.findOneAndUpdate(
            { _id: other },
            {
                $pull:
                {
                    followers: { _id: other }
                }
            },
            {
                new: true
            }
        )
        return meUser;
    }
}

export default UserService.getInstance();