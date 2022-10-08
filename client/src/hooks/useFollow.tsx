import { useMutation } from '@apollo/client';
import apolloQueries from '../queries';

export default function useFollow() {
    const [followMutation, { data, loading, error }] = useMutation(apolloQueries.followQueries.FOLLOW)
    return { followMutation, data, loading, error };
}
