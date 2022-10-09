import { useQuery } from '@apollo/client'
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
