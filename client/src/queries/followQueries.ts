import { gql } from "@apollo/client";
import { CORE_FILE_FIELDS } from "../fragments";

const FOLLOW = gql`
${CORE_FILE_FIELDS}
    mutation Follow($userId: String){
        follow(args:{ userId: $userId }){
            _id
            name
            email
            lastSeen
            file {
                ...CoreFileFields
            }
            followers
            following
        }
    }
`
const followQueries = { FOLLOW }
export default followQueries;