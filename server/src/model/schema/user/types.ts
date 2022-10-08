export interface IUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    file?: string;
    followers?: string[];
    following?: string[];
    dateOfBirth: Date;
    lastSeen?: Date;
}
