import { gql, useMutation } from "@apollo/client"

const COMMENT_POST = gql`
mutation CommentPost($postId: String, $content: String, $commentId: String){
    commentPost(args: { postId: $postId, content: $content, commentId: $commentId }){
        _id
        user {
            _id
            name
            email
            file {
              originalname
            }        
        }
        content
        createdAt
        updatedAt
        comment
        comments
    }
}
`
export const useCommentPost = () => {
    const [commentPostMutation, { data, loading, error }] = useMutation(COMMENT_POST);
    return { commentPostMutation, data, loading, error }
}