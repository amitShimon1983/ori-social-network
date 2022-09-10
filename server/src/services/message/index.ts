import { Types } from 'mongoose';
import { IMessage, MessageModel, MessageThreadModel } from '../../model'
import { IMessageThread } from '../../model/schema/message/types';
class MessageService {
    static instance: MessageService;
    static getInstance() {
        if (!this.instance) {
            this.instance = new MessageService();
        }
        return this.instance;
    }
    async getMessages(userId: string, skip = 0, limit = 20) {
        const query = {
            owners: {
                $in: [userId]
            }
        }
        const userThreads = await MessageThreadModel.find(query, {}, { skip, limit, sort: { lastUpdated: -1 } })
        const threadCount = await MessageThreadModel.count(query);
        const hasMore = (userThreads?.length || 0) + skip < threadCount;
        return { threads: userThreads.map((userThread: IMessageThread) => (userThread?.messages?.[userThread?.messages?.length - 1])), hasMore, count: threadCount };
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