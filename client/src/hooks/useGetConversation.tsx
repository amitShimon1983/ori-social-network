import { useQuery } from '@apollo/client'
import { useEffect } from 'react';
import apolloQueries from '../queries';

export function useGetConversation(messageThreadId?: string, ownerId?: string, onCompleted?: (data: any) => void) {
    const { data, loading, error, subscribeToMore, fetchMore } = useQuery(apolloQueries.messagesQueries.GET_CONVERSATION, {
        variables: {
            messageThreadId,
            ownerId,
            limit: 15
        },
        skip: !messageThreadId && !ownerId,
        onCompleted
    })
    useEffect(() => {
        subscribeToMore({
            document: apolloQueries.inboxQueries.NEW_MESSAGE_SUBSCRIPTION,
            updateQuery: (prev: any, { subscriptionData }: { subscriptionData: any }) => {
                const newMessage = subscriptionData?.data?.newMessage?.messages?.[0];
                if (!newMessage) return prev;
                const newData = { ...prev, getConversation: { ...prev.getConversation, messages: [newMessage, ...prev.getConversation.messages] } };
                return newData;
            }
        })
    }, []);

    useEffect(() => {
        subscribeToMore({
            document: apolloQueries.inboxQueries.ON_MESSAGE_UPDATE_SUBSCRIPTION,
            updateQuery: (prev: any, { subscriptionData }: { subscriptionData: any }) => {
                console.log({ subscriptionData });
                if (!subscriptionData.data) return prev;
                const newMessage = subscriptionData.data.onMessageUpdate;
                const newMessages = prev.getConversation.messages.map((message: any) => {
                    if (message._id === newMessage._id) {
                        return newMessage
                    }
                    return message;
                });
                const newData = { ...prev, getConversation: { ...prev.getConversation, messages: newMessages } };
                return newData;
            }
        })
    }, []);
    const fetchMoreMessages = async (skip: number) => {
        const { data: { getConversation } } = await fetchMore({
            variables: {
                skip
            }
        })
        return { items: getConversation?.messages || [], hasMore: !!getConversation?.hasMore }
    }
    return { data, loading, error, subscribeToMore, fetchMoreMessages };
}
