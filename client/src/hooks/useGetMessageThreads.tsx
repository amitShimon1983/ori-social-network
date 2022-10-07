import { gql, useQuery } from "@apollo/client"
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
export function useGetMessageThreads(onCompleted?: (data: any) => void | Promise<void>) {
    const { data, loading, error, fetchMore, subscribeToMore } = useQuery(GET_MESSAGE_THREADS, {
        onCompleted,
    })
    return { data, loading, error, fetchMore, subscribeToMore, NEW_MESSAGE_THREAD_SUBSCRIPTION }
}
