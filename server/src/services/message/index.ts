import { PubSubEngine } from 'type-graphql';
import { Message, MessageThread, SendMessageArgs, UpdateMessageArgs } from '../../apollo';
import { IMessage, MessageModel, MessageThreadModel } from '../../model'
import { IMessageThread } from '../../model/schema/message/types';
import { IUserReaction } from '../../model/schema/userReaction';
import { ON_MESSAGE_UPDATE, ON_NEW_MESSAGE_CREATED, ON_NEW_MESSAGE_THREAD_CREATED } from '../../utils';
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
                populate: [{
                    path: 'recipient',
                    populate: {
                        path: 'file'
                    }
                }, {
                    path: 'sender',
                    populate: {
                        path: 'file'
                    }
                }],
            },
            {
                path: 'owners',
                populate: {
                    path: 'file'
                }
            }]).lean();
        const threads = [];
        for (let index = 0; index < userThreads.length; index++) {
            const tread = userThreads[index];
            const unReadCount = await MessageModel.count({ messageThreadId: tread._id, recipient: userId, isRead: false });
            threads.push({ ...tread, unreadMessages: unReadCount })
        }
        const threadCount = await MessageThreadModel.count(query);
        const hasMore = (limit || 0) + skip < threadCount;
        return { threads, hasMore, count: threadCount };
    }

    async sendMessage(messageArgs: SendMessageArgs, userId: string, pubSub: PubSubEngine) {
        let messageThread;
        let fireCreateMessageThreadEvent = false;
        if (messageArgs.messageThreadId) {
            messageThread = await MessageThreadModel.findOne({ _id: messageArgs.messageThreadId, owners: { $in: [userId] } });
        } else {
            messageThread = await MessageThreadModel.create({
                owners: [messageArgs.recipient, userId],
                messages: []
            });
            fireCreateMessageThreadEvent = true;
        }
        if (messageThread?._id) {
            const newMessage = await this.createMessage(userId, messageArgs, messageThread.toObject());
            if (newMessage) {
                messageThread?.messages?.push(newMessage._id);
                await messageThread.save();
            }
            const eventPayload: MessageThread = await messageThread.populate([
                {
                    path: 'owners',
                    populate: {
                        path: 'file'
                    }
                }]);
            eventPayload.messages = !!newMessage?._id ? [newMessage as Message] : [];
            if (fireCreateMessageThreadEvent) {
                pubSub.publish(ON_NEW_MESSAGE_THREAD_CREATED, eventPayload);
            }
            else if (!fireCreateMessageThreadEvent) {
                pubSub.publish(ON_NEW_MESSAGE_CREATED, eventPayload);
            }
            return newMessage;
        }

    }

    async getConversation(userId: string, messageThreadId?: string, ownerId?: string, skip?: number, limit?: number) {
        let messageThread;
        if (messageThreadId) {
            messageThread = await MessageThreadModel.findOne({ _id: messageThreadId, owners: { $in: [userId] } })
        } else if (!messageThreadId && ownerId) {
            messageThread = await MessageThreadModel.findOne({ owners: { $all: [userId, ownerId] } });
        }
        if (messageThread?._id) {
            return await this.getMessageThread(messageThread?._id, skip, limit);
        }
    }

    private async getMessageThread(messageThreadId: string | undefined, skip: number | undefined, limit: number | undefined) {
        const thread = await MessageModel.find({ messageThreadId },
            {},
            { skip, limit, sort: { createdAt: -1 } }).populate([{
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
            }, {
                path: 'file',
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
                type: messageArgs.type,
                file: messageArgs?.file
            };
            const newMessage = await MessageModel.create(message);
            return await newMessage.populate([{
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
            }, {
                path: 'file',
            },
            {
                path: 'parentMessageId',
                populate: {
                    path: 'sender',
                    populate: {
                        path: 'file'
                    }
                }
            }]);
        } catch (error: any) {
            console.log({ error });
        }
    }

    async updateMessage(args: UpdateMessageArgs, userId: string, pubSub: PubSubEngine) {

        const message = await MessageModel.findOne({
            $or: [
                { _id: args.id, recipient: userId },
                { _id: args.id, sender: userId }
            ]
        }).populate([{
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
        }, {
            path: 'file',
        },
        {
            path: 'parentMessageId',
            populate: {
                path: 'sender',
                populate: {
                    path: 'file'
                }
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
        }
        ]);
        if (message) {
            if (!message.isRead) { message.isRead = true; }
            if (args.reactionId) {
                const userReaction: IUserReaction = {
                    user: userId,
                    reaction: args.reactionId
                }
                if (message?.reactions?.length) {
                    const findUserReaction = (reaction: any) => {
                        return reaction?.user?.toString() === userId
                    }
                    const filterUserReaction = (reaction: any) => {
                        return reaction?.user?.toString() !== userId
                    }
                    const existing = message.reactions?.find(findUserReaction);
                    if (!existing) {
                        message.reactions.push(userReaction);
                    } else {
                        const notExisting = message.reactions?.filter(filterUserReaction);
                        message.reactions = [...notExisting, userReaction]
                    }
                } else {
                    message.reactions = [userReaction]
                }
                await message.save();

            }
        }
        const messageObj = (await message?.populate({ path: 'reactions' }))?.toObject();
        pubSub.publish(ON_MESSAGE_UPDATE, message?.toObject());
        return messageObj;
    }
}
export default MessageService.getInstance();