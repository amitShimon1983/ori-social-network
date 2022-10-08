import { gql } from "@apollo/client";

const FOLLOW = gql`
    mutation Follow($userId: String){
        follow(args:{ userId: $userId }){
            _id
            name
            email
            lastSeen
            file {
                _id
                originalname
            }
            followers
            following
        }
    }
`
const followQueries = { FOLLOW }
export default followQueries;