import { useMutation } from "@apollo/client"
import apolloQueries from "../queries";

export const useLikePost = () => {
  const [likePostMutation, { data, loading, error }] = useMutation(apolloQueries.postQueries.LIKE_POST);
  return { likePostMutation, data, loading, error };
}