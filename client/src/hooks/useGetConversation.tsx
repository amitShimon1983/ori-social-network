import { useQuery } from '@apollo/client'
import apolloQueries from '../queries';

export function useGetConversation(messageThreadId?: string, ownerId?: string, onCompleted?: (data: any) => void) {
    const { data, loading, error, subscribeToMore } = useQuery(apolloQueries.messagesQueries.GET_CONVERSATION, {
        variables: {
            messageThreadId,
            ownerId
        },
        skip: !messageThreadId && !ownerId,
        onCompleted
    })
   
    return { data, loading, error, subscribeToMore };
}
