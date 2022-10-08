import { useQuery } from "@apollo/client"
import apolloQueries from "../queries";

export const useGetPostLikes = (postId: string) => {
    const { data, loading, error } = useQuery(apolloQueries.postQueries.GET_POST_LIKES, {
        variables: {
            postId
        },
        skip: !postId
    });
    return { data, loading, error };
}
