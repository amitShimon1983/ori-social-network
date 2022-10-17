import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import apolloQueries from '../queries';

export function useGetAppReactions() {
    const { loading, data, error } = useQuery(apolloQueries.appMetadataQueries.GET_APP_REACTIONS);
    const flatList = useMemo(() => {
        let flat: { [key: string]: any } = {}
        for (let index = 0; index < data?.getAppReactions?.reactions.length; index++) {
            const reaction = data?.getAppReactions?.reactions[index];
            flat[reaction._id] = reaction.emoji;
        }
        return flat;
    }, [data?.getAppReactions?.reactions])
    return { loading, data, error, flatList }
}
