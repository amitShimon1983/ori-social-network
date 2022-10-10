import { gql } from "@apollo/client";
import { CORE_USER_FIELDS } from "../fragments";

const GET_USER = gql`
${CORE_USER_FIELDS}
    query GetUser($userId: String){
        getUser(args: { userId: $userId }){
            ...CoreUserFields
        }
    }
`


const UPDATE_USER_CONNECTIVITY_STATUS = gql`
   mutation UpdateUserStatus{
    updateUserStatus
   }
`

const userQueries = { GET_USER, UPDATE_USER_CONNECTIVITY_STATUS }
export default userQueries;