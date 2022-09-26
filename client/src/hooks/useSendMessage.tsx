import { gql, useMutation } from '@apollo/client'

const SEND_MESSAGE = gql`
mutation SendMessage($type: String, $recipient:String, $content:String, $parentMessageId:String, $messageThreadId:String){
    sendMessage(args:{ type: $type, recipient: $recipient, content: $content, parentMessageId: $parentMessageId, messageThreadId: $messageThreadId }){
        isRead
        _id
        sender{
            _id
            name
            email
            lastSeen
            file {
                _id
                originalname
            }
        }
        recipient{
            _id
            name
            email
            lastSeen
            file {
                _id
                originalname
            }
        }
        content
        createdAt
    }
}
`
export function useSendMessage() {
    const [sendMessageMutation, { loading, data, error }] = useMutation(SEND_MESSAGE, {
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
