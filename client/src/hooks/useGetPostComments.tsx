import { gql, useQuery } from "@apollo/client"
const GET_POST_COMMENTS = gql`
   query GetComments($postId: String, $commentId: String){
    getComments(args: { postId: $postId, commentId: $commentId }){
        comments {
            _id
            user {
              _id
              name
              email
              file {
                originalname
              }        
            }
            content
            createdAt
            updatedAt
        }
    }
   }
`;
export const useGetPostComments = (postId: string, onCompleted?: (data: any) => void) => {
    const { data, error, loading, fetchMore } = useQuery(GET_POST_COMMENTS, {
        variables: {
            postId
        },
        skip: !postId,
        onCompleted
    })
    return { data, error, loading, fetchMore }
}