import { gql } from "@apollo/client";

const COMMENT_POST = gql`
mutation CommentPost($postId: String, $content: String, $commentId: String){
    commentPost(args: { postId: $postId, content: $content, commentId: $commentId }){
        _id
        user {
            _id
            name
            email
            lastSeen
            file {
                _id
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
const commentQueries = { COMMENT_POST };
export default commentQueries;