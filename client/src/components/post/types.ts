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
    user?: { [key: string]: any };
    title?: string;
    createdAt?: string;
    file?: File;
    likes?: any[];
    views?: string[]
}
export class Posts {
    posts?: PostDetails[];
}
