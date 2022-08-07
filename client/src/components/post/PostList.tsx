import { gql, useQuery } from "@apollo/client";
import { FunctionComponent } from "react";
import { Spinner } from "../shared";
import Post from "./Post";
import { PostDetails } from "./types";
const GET_RANDOM_POSTS = gql`
query GetRandomPosts{
    getRandomPosts{
        posts{
            _id
            user
            title
            createdAt
            file {
                originalname
                encoding
                mimetype
                filename
                path
                size
            }
        }
    }
}
`
interface PostListProps {
    postClassName?: string;
}

const PostList: FunctionComponent<PostListProps> = ({ postClassName }) => {
    const { data, error, loading } = useQuery(GET_RANDOM_POSTS)
    return (<>
        {loading && <Spinner label="Loading..." />}
        {error && <div>{error?.message}</div>}
        {!!data?.getRandomPosts.posts?.length &&
            data?.getRandomPosts?.posts?.map((post: PostDetails) => <Post containerClassName={postClassName}key={post._id} post={post} />)}
    </>);
}

export default PostList;