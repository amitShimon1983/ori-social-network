import { useQuery } from '@apollo/client';
import apolloQueries from '../queries';

export function useGetAppReactions() {
    const { loading, data, error } = useQuery(apolloQueries.appMetadataQueries.GET_APP_REACTIONS)
    return { loading, data, error }
}
