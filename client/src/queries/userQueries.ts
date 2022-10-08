import { gql } from "@apollo/client";

const GET_USER = gql`
    query GetUser($userId: String){
        getUser(args: { userId: $userId }){
            _id
            name
            lastSeen
            email
            file {
                _id
                originalname
            }
            followers
            following
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