import { gql, useQuery } from "@apollo/client"

const GET_My_POSTS = gql`
query GetMyPosts($userId: String){
    getMyPosts(args:{ userId: $userId }){
        posts {
            _id
            user {
                _id
                name
                email
                file {
                  originalname
                }  
            }
            title
            createdAt
            file {
                originalname
                encoding
                mimetype
                filename
                path
                size
            }
        }
    }
}
`
export function useGetMyPosts(userId: string) {
    const { data, loading } = useQuery(GET_My_POSTS, { variables: { userId }, skip: !userId })
    return { data, loading }
}
