import { Types } from 'mongoose';
import { SendMessageArgs, UpdateMessageArgs } from '../../apollo';
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
        const userThreads = await MessageThreadModel.find(query,
            { messages: { $slice: -1 } },
            { skip, limit, sort: { lastUpdated: -1 } }).populate([{
                path: 'messages',
                populate: {
                    path: 'recipient',
                    populate: {
                        path: 'file'
                    }
                },
            }, {
                path: 'messages',
                populate: {
                    path: 'sender',
                    populate: {
                        path: 'file'
                    }
                },
            }, {
                path: 'owners',
                populate: {
                    path: 'file'
                }
            }]).lean();


        const threadCount = await MessageThreadModel.count(query);
        const hasMore = (limit || 0) + skip < threadCount;
        return { threads: userThreads, hasMore, count: threadCount };
    }

    async sendMessage(messageArgs: SendMessageArgs, userId: string) {
        let messageThread;
        if (messageArgs.messageThreadId) {
            messageThread = await MessageThreadModel.findOne({ _id: messageArgs.messageThreadId, owners: { $in: [userId] } });
        } else {
            messageThread = await MessageThreadModel.create({
                owners: [messageArgs.recipient, userId],
                messages: []
            });
        }
        if (messageThread?._id) {
            const newMessage = await this.createMessage(userId, messageArgs, messageThread);
            if (newMessage) {
                messageThread?.messages?.push(newMessage._id);
                await messageThread.save();
            }
            return newMessage?.populate([{
                path: 'recipient',
                populate: {
                    path: 'file'
                }
            }, {
                path: 'sender',
                populate: {
                    path: 'file'
                }
            }]);
        }

    }
    async getConversation(userId: any, messageThreadId?: string, skip?: number, limit?: number) {
        if (await MessageThreadModel.findOne({ _id: messageThreadId, owners: { $in: [userId] } })) {

            const thread = await MessageModel.find({ messageThreadId },
                {},
                { skip, limit, sort: { lastUpdated: -1 } }).populate([{
                    path: 'recipient',
                    populate: {
                        path: 'file'
                    }
                },
                {
                    path: 'sender',
                    populate: {
                        path: 'file'
                    }
                },
                {
                    path: 'parentMessageId',
                    populate: {
                        path: 'sender',
                        populate: {
                            path: 'file'
                        }
                    }
                }]).lean();
            const count = await MessageModel.count({ messageThreadId });
            const hasMore = (thread.length || 0) + (skip || 0) < count;
            return { messages: thread, hasMore, count };
        }
    }
    private async createMessage(userId: string, messageArgs: SendMessageArgs, messageThread: IMessageThread) {
        try {
            const message: IMessage = {
                sender: userId,
                content: messageArgs.content,
                createdAt: new Date(),
                isRead: false,
                recipient: messageArgs.recipient,
                messageThreadId: messageThread?._id,
                parentMessageId: messageArgs.parentMessageId,
            };
            const newMessage = await MessageModel.create(message);
            return newMessage;
        } catch (error: any) {
            console.log({ error });
        }
    }
    async updateMessage(args: UpdateMessageArgs, userId: string) {
        return await MessageModel.findOneAndUpdate({ _id: args._id, recipient: userId }, { isRead: true }, {
            new: true
        })
    }
}
export default MessageService.getInstance();