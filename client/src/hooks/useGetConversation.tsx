import { gql, useQuery } from '@apollo/client'

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
export function useGetConversation(messageThreadId?: string, ownerId?: string, onCompleted?: (data: any) => void) {
    const { data, loading, error } = useQuery(GET_CONVERSATION, {
        variables: {
            messageThreadId,
            ownerId
        },
        skip: !messageThreadId && !ownerId,
        onCompleted
    })
    return { data, loading, error };
}
