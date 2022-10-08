import { gql, useMutation } from '@apollo/client'
import apolloQueries from '../queries';

export function useSendMessage() {
    const [sendMessageMutation, { loading, data, error }] = useMutation(apolloQueries.messagesQueries.SEND_MESSAGE,
        {
            update(cache, { data: { sendMessage } }) {
                cache.modify({
                    fields: {
                        getConversation(oldData = []) {
                            const newMessageRef = cache.writeFragment({
                                data: sendMessage,
                                fragment: gql`
                                    fragment NewMessage on Message {
                                        _id
                                        __typename
                                    }
                                `
                            });
                            const messages = [...(oldData?.messages || []), newMessageRef];
                            return { ...oldData, messages };
                        }
                    }
                });
            }
        })
    return ({ sendMessageMutation, loading, data, error })
}
