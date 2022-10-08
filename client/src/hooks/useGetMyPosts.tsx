import { useQuery } from "@apollo/client"
import apolloQueries from "../queries"

export function useGetMyPosts(userId: string) {
    const { data, loading } = useQuery(apolloQueries.postQueries.GET_MY_POSTS, { variables: { userId }, skip: !userId })
    return { data, loading }
}
