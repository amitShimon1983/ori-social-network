


export class PostDetails {
    _id?: string;
    userId?: string;
    originalname?: string;
    encoding?: string;
    mimetype?: string;
    filename?: string;
    path?: string;
    size?: number;
}

export class Posts {
    posts?: PostDetails[];
}