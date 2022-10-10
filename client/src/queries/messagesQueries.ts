import { gql } from "@apollo/client";
import { CORE_MESSAGE_FIELDS } from "../fragments";

const GET_CONVERSATION = gql`
${CORE_MESSAGE_FIELDS}
query GetConversation($messageThreadId:String,$ownerId: String, $skip:Int, $limit:Int){
    getConversation(args:{ messageThreadId: $messageThreadId, ownerId: $ownerId, skip: $skip, limit: $limit  }){
        messages{
            ...CoreMessageFields
        }
        count
        hasMore
    }
}
`
const SEND_MESSAGE = gql`
${CORE_MESSAGE_FIELDS}
mutation SendMessage($type: String, $recipient:String, $content:String, $parentMessageId:String, $messageThreadId:String){
    sendMessage(args:{ type: $type, recipient: $recipient, content: $content, parentMessageId: $parentMessageId, messageThreadId: $messageThreadId }){
        ...CoreMessageFields
    }
}
`
const UPDATE_MESSAGE = gql`
mutation UpdateMessage($isRead:Boolean, $id:String){
    updateMessage(args:{isRead: $isRead, id: $id}){
        isRead
        _id
    }
}
`;
const messagesQueries = { GET_CONVERSATION, SEND_MESSAGE, UPDATE_MESSAGE };

export default messagesQueries;