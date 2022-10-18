import { useSubscription } from "@apollo/client";
import apolloQueries from "../queries";
export function useOnCallCreated() {
    const { data, loading } = useSubscription(apolloQueries.liveQueries.ON_CALL_START)
    return { data, loading };
}
