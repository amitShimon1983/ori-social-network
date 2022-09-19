import { gql, useQuery } from "@apollo/client"

const GET_MESSAGE_THREADS = gql`
query GetMessageThreads($skip:Int, $limit:Int){
    getMessageThreads(args:{skip:$skip, limit:$limit}){
        threads{
            _id
            owners{
                _id
                name
                email
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
    const { data, loading, error, fetchMore } = useQuery(GET_MESSAGE_THREADS, {
        onCompleted,
        pollInterval: 5000,
    })
    return { data, loading, error, fetchMore }
}
