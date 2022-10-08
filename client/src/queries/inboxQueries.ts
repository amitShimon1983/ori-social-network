import { gql } from "@apollo/client"

const NEW_MESSAGE_SUBSCRIPTION = gql`
subscription NewMessage {
  newMessage {
    _id
    unreadMessages
    owners{
        _id
        name
        email
        lastSeen
        file {
            _id
            originalname
        }
    }
    messages {
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
            file {
                _id
                originalname
            }
        }
        content
        createdAt
    }
  }
}
`
const NEW_MESSAGE_THREAD_SUBSCRIPTION = gql`
subscription NewMessageThread {
  newMessageThread {
    _id
    unreadMessages
    owners{
        _id
        name
        email
        lastSeen
        file {
            _id
            originalname
        }
    }
    messages {
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
            file {
                _id
                originalname
            }
        }
        content
        createdAt
    }
  }
}
`
const GET_MESSAGE_THREADS = gql`
query GetMessageThreads($skip:Int, $limit:Int){
    getMessageThreads(args:{skip:$skip, limit:$limit}){
        threads{
            _id
            unreadMessages
            owners{
                _id
                name
                email
                lastSeen
                file {
                    _id
                    originalname
                }
            }
            messages {
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
                    file {
                        _id
                        originalname
                    }
                }
                content
                createdAt
            }
        }
        count
        hasMore
    }
}
`
const inboxQueries = { NEW_MESSAGE_SUBSCRIPTION, GET_MESSAGE_THREADS, NEW_MESSAGE_THREAD_SUBSCRIPTION }
export default inboxQueries;