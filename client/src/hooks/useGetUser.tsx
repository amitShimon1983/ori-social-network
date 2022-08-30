import { gql, useQuery } from '@apollo/client'
const GET_USER = gql`
    query GetUser($userId: String){
        getUser(args: { userId: $userId }){
            _id
            name
            email
            file {
                originalname
            }
            followers
            following
        }
    }
`
export function useGetUser(userId?: string) {
    const { loading, error, data } = useQuery(GET_USER, {
        variables: {
            userId
        },
        skip: !userId
    })
    return { loading, error, data }
}
