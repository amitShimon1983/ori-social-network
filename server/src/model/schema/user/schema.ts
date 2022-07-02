import { model, Schema } from "mongoose";
import { IUser } from "./type";

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: String
});

const UserModel = model<IUser>('User', userSchema);

export default UserModel;