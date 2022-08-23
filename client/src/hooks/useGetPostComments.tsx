import { gql, useQuery } from "@apollo/client"
const GET_POST_COMMENTS = gql`
   query GetComments($postId: String, $commentId: String, $skip: Int, $limit: Int){
    getComments(args: { postId: $postId, commentId: $commentId, limit: $limit, skip: $skip }){
        count
        hasMore
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
            comments
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
            postId,
            skip: 0,
            limit: 20
        },
        skip: !postId,
        onCompleted
    })
    return { data, error, loading, fetchMore }
}