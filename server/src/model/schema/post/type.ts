import { ILike } from "../like/type";
import { IComment } from "../comment/type";

export interface IPost {
    file?: string;
    user?: string;
    title?: string;
    createdAt?: Date;
    likes: ILike[]
    comments: IComment[]
}