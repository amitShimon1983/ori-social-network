import { gql, useQuery } from "@apollo/client"
const GET_POST_LIKES = gql`
query GetPostLikes($postId:String){
    getLikes(args:{postId:$postId}){
        likes{
            _id
            post
            user
        }
    }
}
`
export const useGetPostLikes = (postId: string) => {
    const { data, loading, error } = useQuery(GET_POST_LIKES, {
        variables: {
            postId
        },
        skip: !postId
    });
    return { data, loading, error };
}
