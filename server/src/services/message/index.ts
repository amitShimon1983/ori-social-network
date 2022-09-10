import { Types } from 'mongoose';
import { IMessage, MessageModel, MessageThreadModel } from '../../model'
class MessageService {
    static instance: MessageService;
    static getInstance() {
        if (!this.instance) {
            this.instance = new MessageService();
        }
        return this.instance;
    }
    async getMessages(userId: string, parentMessageId?: string, skip = 0, limit = 20) {
        const query1 = !!parentMessageId ? { parentMessageId } : {}
        const query = { recipient: new Types.ObjectId(userId), parentMessageId: !!parentMessageId ? new Types.ObjectId(parentMessageId) : parentMessageId };
        const messagesCount = await MessageModel.count(query);
        const messages = await MessageModel.find(query, {}, { skip, limit }).populate([{
            path: 'sender',
            populate: {
                path: 'file'
            }
        }]).lean();
        const hasMore = (messages?.length || 0) + skip < messagesCount;
        return { messages, hasMore, count: messagesCount };
    }
    async readMessage(userId: string, messageId: string) {
        const query = { recipient: new Types.ObjectId(userId), _id: new Types.ObjectId(messageId) };

        const message = await MessageModel.findOneAndUpdate(query, { isRead: true }, { new: true, upsert: true }).populate([{
            path: 'sender',
            populate: {
                path: 'file'
            }
        }]).lean();

        return message;
    }
    async sendMessage(message: IMessage) {
        const newMessageThread = await MessageThreadModel.create({
            owners: [message.recipient, message.sender],
            messages: [await MessageModel.create(message)]
        });
        return newMessageThread;
    }
}
export default MessageService.getInstance();