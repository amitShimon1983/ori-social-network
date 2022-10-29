import { useSubscription } from '@apollo/client';
import apolloQueries from '../queries';

export function useOnCallAnswer(onData?: (data: any) => void) {
    const { data, loading } = useSubscription(apolloQueries.liveQueries.ON_CALL_ANSWER, {
        onSubscriptionData: onData,
    })
    return { data, loading };
}
