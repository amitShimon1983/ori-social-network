import { gql } from "@apollo/client";
import { CORE_USER_FIELDS } from "../fragments";

const COMMENT_POST = gql`
${CORE_USER_FIELDS}
mutation CommentPost($postId: String, $content: String, $commentId: String){
    commentPost(args: { postId: $postId, content: $content, commentId: $commentId }){
        _id
        user {
            ...CoreUserFields
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