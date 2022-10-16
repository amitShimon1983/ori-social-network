import { useMutation } from '@apollo/client'
import apolloQueries from '../queries'

export function useUpdateMessage() {
    const [updateMessageMutation, { data, error, loading }] = useMutation(apolloQueries.messagesQueries.UPDATE_MESSAGE)
    const updateMessage = async (messageId: string, skip: boolean, reactionId?: string) => {
        if (!skip) {
            await updateMessageMutation({
                variables: {
                    isRead: true,
                    reactionId,
                    id: messageId
                }
            })
        }
    }
    return { data, error, loading, updateMessage }
}
