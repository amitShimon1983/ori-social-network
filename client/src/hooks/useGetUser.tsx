import { useQuery } from '@apollo/client'
import apolloQueries from '../queries'

export function useGetUser(userId?: string) {
    const { loading, error, data } = useQuery(apolloQueries.userQueries.GET_USER, {
        variables: {
            userId
        },
        skip: !userId
    })
    return { loading, error, data }
}
