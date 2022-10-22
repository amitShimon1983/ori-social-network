import { useSubscription } from "@apollo/client"
import apolloQueries from "../queries"


export default function useOnIceCandidate() {
    const { data, loading, error } = useSubscription(apolloQueries.liveQueries.ON_ICE_CANDIDATE)
    return { data, loading, error };
}
