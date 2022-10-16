import { useMutation } from "@apollo/client"
import apolloQueries from "../queries";

export const useViewPost = () => {
  const [viewPostMutation, { data, loading, error }] = useMutation(apolloQueries.postQueries.VIEW_POST);
  return { viewPostMutation, data, loading, error };
}