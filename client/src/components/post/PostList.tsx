import { FunctionComponent } from "react";
import { Spinner } from "../shared";
import Post from "./Post";
import { PostDetails } from "./types";
interface PostListProps {
    postClassName?: string;
    posts: any[];
}

const PostList: FunctionComponent<PostListProps> = ({ posts, postClassName }) => {
    return (<>
        {!!posts?.length &&
            posts?.map((post: PostDetails) => <Post containerClassName={postClassName} key={post._id} post={post} />)}
    </>);
}

export default PostList;