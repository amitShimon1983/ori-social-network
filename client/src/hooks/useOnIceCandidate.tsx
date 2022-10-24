import { useSubscription } from "@apollo/client"
import apolloQueries from "../queries"


export default function useOnIceCandidate(onData?: (data: any) => void) {
    const { data, loading, error } = useSubscription(apolloQueries.liveQueries.ON_ICE_CANDIDATE, {
        onSubscriptionData: onData,
    })
    return { data, loading, error };
}
