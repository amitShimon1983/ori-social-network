import { gql, useLazyQuery } from '@apollo/client'

const GET_CONVERSATION = gql`
query GetConversation($messageThreadId:String, $skip:Int, $limit:Int){
    getConversation(args:{ messageThreadId: $messageThreadId, skip: $skip, limit: $limit  }){
        messages{
            isRead
            _id
            sender{
                _id
                name
                email
                file {
                    originalname
                }
            }
            recipient{
                _id
                name
                email
                file {
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
export function useGetConversation() {
    const [getConversationQuery, { data, loading, error }] = useLazyQuery(GET_CONVERSATION)
    return { getConversationQuery, data, loading, error };
}
