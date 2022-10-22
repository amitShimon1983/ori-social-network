import { useSubscription } from '@apollo/client';
import apolloQueries from '../queries';

export function useOnCallAnswer() {
    const { data, loading } = useSubscription(apolloQueries.liveQueries.ON_CALL_ANSWER)
    return { data, loading };
}
