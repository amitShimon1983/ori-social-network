import { useQuery } from "@apollo/client";
import apolloQueries from "../queries";

export const useGetRandomPosts = () => {
    const { data, error, loading } = useQuery(apolloQueries.postQueries.GET_RANDOM_POSTS)
    return { data, error, loading };
}
