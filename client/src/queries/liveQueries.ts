import { gql } from "@apollo/client";
import { CORE_USER_FIELDS } from "../fragments";
const SEND_ICE_CANDIDATE = gql`
mutation SendIceCandidate($addressee: String, $icecandidate: String){
    sendIceCandidate(args: {
        addressee:$addressee,
        icecandidate:$icecandidate
    })
}
`;
const ON_ICE_CANDIDATE = gql`
 subscription OnIceCandidate{
   onIceCandidate{
        addressee
        icecandidate
        caller
    }
 }
`
const ON_CALL_START = gql`
${CORE_USER_FIELDS}
 subscription OnCallStart{
    onCallStart{
        addressee
        sdp
        caller{
            ...CoreUserFields
        }
    }
 }
`
const ON_CALL_ANSWER = gql`
 subscription OnCallAnswer{
   onCallAnswer{
        addressee
        sdp
        caller
    }
 }
`
const START_CALL = gql`
 mutation StartCall($sdp:String, $addressee: String){
    startCall(args:{sdp:$sdp, addressee: $addressee})
 }
`
const ANSWER_CALL = gql`
 mutation AnswerCall($sdp:String, $addressee: String){
    answerCall(args:{sdp:$sdp, addressee: $addressee})
 }
`
const liveQueries = {
   START_CALL,
   ANSWER_CALL,
   SEND_ICE_CANDIDATE,
   ON_CALL_START,
   ON_CALL_ANSWER,
   ON_ICE_CANDIDATE,
}
export default liveQueries;