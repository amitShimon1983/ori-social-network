import { gql } from "@apollo/client";
import { CORE_USER_FIELDS } from "../fragments";
const SEND_ICE_CANDIDATE = gql`
mutation SendIceCandidate($addressee: String, $icecandidate: String, $id: String){
    sendIceCandidate(args: {
        addressee:$addressee,
        icecandidate:$icecandidate,
        id:$id
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
        id
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
        id
    }
 }
`
const START_CALL = gql`
 mutation StartCall($sdp:String, $addressee: String, $id: String){
    startCall(args:{sdp:$sdp, addressee: $addressee,
        id:$id})
 }
`
const ANSWER_CALL = gql`
 mutation AnswerCall($sdp:String, $addressee: String, $id: String){
    answerCall(args:{sdp:$sdp, addressee: $addressee,
        id:$id})
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