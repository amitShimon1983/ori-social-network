import { model, Schema } from "mongoose";
import { IUser } from "./types";

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    file: { type: Schema.Types.ObjectId, ref: 'File' },
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    dateOfBirth: { type: Date, required: true },
    lastSeen: { type: Date, required: true }
});
userSchema.index({ name: 'text', email: 'text' });
const UserModel = model<IUser>('User', userSchema);

export default UserModel;