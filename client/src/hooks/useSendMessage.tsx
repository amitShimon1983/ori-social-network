import { gql, useMutation } from '@apollo/client'

const SEND_MESSAGE = gql`
mutation SendMessage($recipient:String, $content:String, $parentMessageId:String, $messageThreadId:String){
    sendMessage(args:{ recipient: $recipient, content: $content, parentMessageId: $parentMessageId, messageThreadId: $messageThreadId }){
        isRead
        _id
        sender{
            _id
            name
            email
            file {
                originalname
            }
        }
        recipient{
            _id
            name
            email
            file {
                originalname
            }
        }
        content
        createdAt
    }
}
`
export function useSendMessage() {
    const [sendMessageMutation, { loading, data, error }] = useMutation(SEND_MESSAGE)
    return ({ sendMessageMutation, loading, data, error })
}
