export interface IComment {
    _id?: string;
    user?: string;
    content?: string;
    post?: string;
    comment?: string;
    comments?: [string];
}