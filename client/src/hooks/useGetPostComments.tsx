import { gql, useQuery } from "@apollo/client"
const GET_POST_COMMENTS = gql`
   query GetComments($postId: String, $commentId: String){
    getComments(args:{ postId: $postId, commentId: $commentId}){
        comments{
            _id
            user
            content
            createdAt
            updatedAt
        }
    }
   }
`;
export const useGetPostComments = (postId: string) => {
    const { data, error, loading, fetchMore } = useQuery(GET_POST_COMMENTS, {
        variables: {
            postId
        },
        skip: !postId
    })
    return { data, error, loading, fetchMore }
}