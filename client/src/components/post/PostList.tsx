import { FunctionComponent } from "react";
import Post from "./Post";
import { PostDetails } from "./types";
interface PostListProps {
    styles?: {
        postContainerClassName?: string;
        footerStyles?: {
            containerClassName: string;
            iconContainerClassName?: string;
            iconInnerContainerClassName?: string;
        }
    }
    posts: any[];
    displayPostPersona?: boolean;
}

const PostList: FunctionComponent<PostListProps> = ({ posts, styles, displayPostPersona }) => {
    return (<>
        {!!posts?.length &&
            posts?.map((post: PostDetails) => <Post displayPostPersona={displayPostPersona} styles={{ containerClassName: styles?.postContainerClassName, footerStyles: styles?.footerStyles }} key={post._id} post={post} />)}
    </>);
}

export default PostList;