import { gql } from "@apollo/client";

const ON_CALL_START = gql`
 subscription OnCallStart{
    onCallStart{
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
const liveQueries = { ON_CALL_START, START_CALL }
export default liveQueries;