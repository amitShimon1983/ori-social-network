import { useSubscription } from "@apollo/client";
import apolloQueries from "../queries";
export function useOnCallCreated(onData?: (data: any) => void) {
    const { data, loading } = useSubscription(apolloQueries.liveQueries.ON_CALL_START, {
        onSubscriptionData: onData
    })
    return { data, loading };
}
