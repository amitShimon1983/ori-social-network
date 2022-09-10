import { gql, useQuery } from "@apollo/client"

const GET_MESSAGE_THREADS = gql`
query GetMessageThreads($skip:Int, $limit:Int){
    getMessageThreads(args:{skip:$skip, limit:$limit}){
        threads{
            isRead
            _id
            sender
            recipient
            content
            createdAt
        }
        count
        hasMore
    }
}
`
export function useGetMessageThreads(onCompleted?: (data: any) => void | Promise<void>) {
    const { data, loading, error, fetchMore } = useQuery(GET_MESSAGE_THREADS, {
        onCompleted
    })
    return { data, loading, error, fetchMore }
}
