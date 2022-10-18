import { useMutation } from '@apollo/client'
import apolloQueries from "../queries";

export function useStartCall() {
    const [startCallMutation, { data, loading, error }] = useMutation(apolloQueries.liveQueries.START_CALL)
    return { startCallMutation, data, loading, error }
}
