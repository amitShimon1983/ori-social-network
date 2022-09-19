import { gql, useQuery, useLazyQuery } from "@apollo/client"
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
                _id
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
export const useGetPostComments = (postId: string, onCompleted?: (data: any) => void, onLazyCompleted?: (data: any) => void) => {
    const { data, error, loading, fetchMore } = useQuery(GET_POST_COMMENTS, {
        variables: {
            postId,
            skip: 0,
            limit: 20
        },
        skip: !postId,
        onCompleted
    })
    const [getLazyComment, { data: lazyData, error: lazyError, loading: lazyLoading, fetchMore: lazyFetchMore }] = useLazyQuery(GET_POST_COMMENTS, {
        variables: {
            postId,
            commentId: undefined,
            skip: 0,
            limit: 20
        },
        onCompleted: onLazyCompleted
    })
    return {
        data,
        error,
        loading,
        fetchMore,
        getLazyComment,
        lazyData,
        lazyError,
        lazyLoading,
        lazyFetchMore
    }
}

