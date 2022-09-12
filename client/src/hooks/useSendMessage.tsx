import { gql, useLazyQuery, useMutation } from '@apollo/client'
import React from 'react'


const SEND_MESSAGE = gql`
mutation SendMessage($recipient:String, $content:String, $parentMessageId:String, $messageThreadId:String){
    sendMessage(args:{ recipient: $recipient, content: $content, parentMessageId: $parentMessageId, messageThreadId: $messageThreadId })
}
`
export function useSendMessage() {
    const [sendMessageMutation, { loading, data, error }] = useMutation(SEND_MESSAGE)
    return ({ sendMessageMutation, loading, data, error })
}
