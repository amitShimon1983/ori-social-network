import { gql, useMutation } from "@apollo/client"

const COMMENT_POST = gql`
mutation CommentPost($postId: String, $content: String, $commentId: String){
    commentPost(args: { postId: $postId, content: $content, commentId: $commentId }){
        _id
        user
        content
        createdAt
        updatedAt
        comment
    }
}
`
export const useCommentPost = () => {
    const [commentPostMutation, { data, loading, error }] = useMutation(COMMENT_POST);
    return { commentPostMutation, data, loading, error }
}