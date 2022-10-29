import {  useMutation } from "@apollo/client";
import apolloQueries from "../queries";


export function useSendIceCandidate() {
    const [sendIceCandidateMutation, { data, loading, error }] = useMutation(apolloQueries.liveQueries.SEND_ICE_CANDIDATE)
    return { sendIceCandidateMutation, data, loading, error }
}
