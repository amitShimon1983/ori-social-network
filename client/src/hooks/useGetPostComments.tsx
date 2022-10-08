import { useQuery, useLazyQuery } from "@apollo/client"
import apolloQueries from "../queries"

export const useGetPostComments = (postId: string, onCompleted?: (data: any) => void, onLazyCompleted?: (data: any) => void) => {
    const { data, error, loading, fetchMore } = useQuery(apolloQueries.postQueries.GET_POST_COMMENTS, {
        variables: {
            postId,
            skip: 0,
            limit: 20
        },
        skip: !postId,
        onCompleted
    })
    const [getLazyComment, { data: lazyData, error: lazyError, loading: lazyLoading, fetchMore: lazyFetchMore }] = useLazyQuery(apolloQueries.postQueries.GET_POST_COMMENTS, {
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

