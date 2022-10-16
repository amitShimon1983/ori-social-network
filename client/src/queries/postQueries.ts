import { gql } from "@apollo/client";
import { CORE_POST_FIELDS, CORE_USER_FIELDS } from "../fragments";

const GET_MY_POSTS = gql`
${CORE_POST_FIELDS}
query GetMyPosts($userId: String){
    getMyPosts(args:{ userId: $userId }){
        posts {
            ...CorePostFields
        }
    }
}
`
const GET_POST_COMMENTS = gql`
${CORE_USER_FIELDS}
   query GetComments($postId: String, $commentId: String, $skip: Int, $limit: Int){
    getComments(args: { postId: $postId, commentId: $commentId, limit: $limit, skip: $skip }){
        count
        hasMore
        comments {
            _id
            user {
              ...CoreUserFields
            }
            comments
            content
            createdAt
            updatedAt
        }
    }
   }
`;
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

const GET_RANDOM_POSTS = gql`
${CORE_POST_FIELDS}
 query GetRandomPosts{
     getRandomPosts{
         posts {
             ...CorePostFields
         }
     }
 }
 `
const LIKE_POST = gql`
 mutation LikePost($postId:String,$action:String) {
   likePost(args:{postId:$postId, action:$action}){
       _id
       user
       post
   }
 }
`;

const VIEW_POST = gql`
mutation AddViews($postId:String) {
    addViews(args:{postId:$postId})
}
`;

const postQueries = {
    LIKE_POST,
    VIEW_POST,
    GET_MY_POSTS,
    GET_POST_COMMENTS,
    GET_POST_LIKES,
    GET_RANDOM_POSTS
};
export default postQueries;