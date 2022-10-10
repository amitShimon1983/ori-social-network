import { gql } from "@apollo/client"
import { CORE_MESSAGE_FIELDS, CORE_USER_FIELDS } from "../fragments"

const NEW_MESSAGE_SUBSCRIPTION = gql`
${CORE_MESSAGE_FIELDS}
${CORE_USER_FIELDS}
subscription NewMessage {
  newMessage {
    _id
    owners{
        ...CoreUserFields
    }
    messages {
        ...CoreMessageFields
    }
  }
}
`
const NEW_MESSAGE_THREAD_SUBSCRIPTION = gql`
${CORE_MESSAGE_FIELDS}
${CORE_USER_FIELDS}
subscription NewMessageThread {
  newMessageThread {
    _id
    owners{
        ...CoreUserFields
    }
    messages {
        ...CoreMessageFields
    }
  }
}
`
const GET_MESSAGE_THREADS = gql`
${CORE_MESSAGE_FIELDS}
${CORE_USER_FIELDS}
query GetMessageThreads($skip:Int, $limit:Int){
    getMessageThreads(args:{skip:$skip, limit:$limit}){
        threads{
            _id
            unreadMessages
            owners{
                ...CoreUserFields
            }
            messages {
                ...CoreMessageFields
            }
        }
        count
        hasMore
    }
}
`
const inboxQueries = { NEW_MESSAGE_SUBSCRIPTION, GET_MESSAGE_THREADS, NEW_MESSAGE_THREAD_SUBSCRIPTION }
export default inboxQueries;