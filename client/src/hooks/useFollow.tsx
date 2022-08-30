import { gql, useMutation } from '@apollo/client';
const FOLLOW = gql`
    mutation Follow($userId: String){
        follow(args:{ userId: $userId }){
            _id
            name
            email
            file {
                originalname
            }
            followers
            following
        }
    }
`
export default function useFollow() {
    const [followMutation, { data, loading, error }] = useMutation(FOLLOW)
    return { followMutation, data, loading, error };
}
