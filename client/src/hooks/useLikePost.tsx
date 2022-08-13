import { useMutation, gql } from "@apollo/client"

const LIKE_POST = gql`
  mutation LikePost($postId:String,$action:String) {
    likePost(args:{postId:$postId, action:$action}){
        _id
        user
        post
    }
  }
`;

export const useLikePost = () => {
  const [likePostMutation, { data, loading, error }] = useMutation(LIKE_POST);
  return { likePostMutation, data, loading, error };
}