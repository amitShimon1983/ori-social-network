import { gql, useLazyQuery, useQuery } from '@apollo/client'

const GET_CONVERSATION = gql`
query GetConversation($messageThreadId:String, $skip:Int, $limit:Int){
    getConversation(args:{ messageThreadId: $messageThreadId, skip: $skip, limit: $limit  }){
        messages{
            isRead
            _id
            type
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
export function useGetConversation(messageThreadId?: string, onCompleted?: (data: any) => void) {
    const { data, loading, error } = useQuery(GET_CONVERSATION, {
        variables: {
            messageThreadId
        },
        skip: !messageThreadId,
        pollInterval: 1500,
        onCompleted
    })
    return { data, loading, error };
}
