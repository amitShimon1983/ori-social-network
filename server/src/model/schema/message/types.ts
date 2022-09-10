export interface IMessage {
    _id: string;
    sender?: string;
    recipient?: string;
    content: string;
    createdAt: Date;
    isRead: boolean;
    parentMessageId?: string;
}
export interface IMessageThread {
    _id: string;
    lastUpdated: Date;
    owners?: string[];
    messages?: string[];
}