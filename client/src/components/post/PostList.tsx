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
            iconNumberClassName?: string;
            icon?: string;
        },
        videoStyles?: {
            videoClassName?: string;
            containerClassName?: string;
        }
    }
    posts: any[];
    displayToolbar?: boolean;
}

const PostList: FunctionComponent<PostListProps> = ({ posts, styles, displayToolbar }) => {
    return (<>
        {!!posts?.length &&
            posts?.map((post: PostDetails) =>
                <Post displayToolbar={displayToolbar} styles={{
                    containerClassName: styles?.postContainerClassName,
                    footerStyles: styles?.footerStyles,
                    videoStyles: styles?.videoStyles
                }} key={post._id} post={post} />
            )}
    </>);
}

export default PostList;