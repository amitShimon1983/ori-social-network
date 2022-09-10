import { model, Schema } from "mongoose";
import { IMessage, IMessageThread } from "./types";

const messageSchema = new Schema<IMessage>({
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    recipient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    parentMessageId: { type: Schema.Types.ObjectId, ref: 'Message', required: false },
    content: { type: String, required: true },
    createdAt: { type: Date, default: new Date() },
    isRead: { type: Boolean, default: false }
});
const messageThreadSchema = new Schema<IMessageThread>({
    owners: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message', required: true }]
});

const MessageModel = model<IMessage>('Message', messageSchema);
const MessageThreadModel = model<IMessageThread>('MessageThread', messageThreadSchema);

export  { MessageModel, MessageThreadModel };