import { gql } from "@apollo/client";

const GET_CONVERSATION = gql`
query GetConversation($messageThreadId:String,$ownerId: String, $skip:Int, $limit:Int){
    getConversation(args:{ messageThreadId: $messageThreadId, ownerId: $ownerId, skip: $skip, limit: $limit  }){
        messages{
            isRead
            _id
            type
            messageThreadId
            file {
                _id
                originalname
            }
            parentMessageId{
                _id
                content
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
            }
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
        count
        hasMore
    }
}
`
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
        messageThreadId
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