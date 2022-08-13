export class File {
    _id?: string;
    originalname?: string;
    encoding?: string;
    mimetype?: string;
    filename?: string;
    path?: string;
    size?: number;
}
export class PostDetails {
    _id?: string;
    user?: string;
    title?: string;
    createdAt?: string;
    file?: File;
    likes?: any[]
}
export class Posts {
    posts?: PostDetails[];
}
