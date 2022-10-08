import { useMutation } from "@apollo/client"
import apolloQueries from "../queries";

export const useCommentPost = () => {
    const [commentPostMutation, { data, loading, error }] = useMutation(apolloQueries.commentQueries.COMMENT_POST);
    return { commentPostMutation, data, loading, error }
}