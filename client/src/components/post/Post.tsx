import { FunctionComponent } from "react";
import { Video } from "../video";
import { VideoFooter } from "../videoFooter";
import { PostDetails } from "./types";
import classes from './Post.module.css';
import { appContextVar } from "../../services/store";
import { useDownloadFile, useGetPostComments, useGetPostLikes, useViewPost } from "../../hooks";
import { FaEye, Paper, Skeleton } from "../shared";
interface PostProps {
    post: PostDetails;
    displayToolbar?: boolean;
    styles?: {
        containerClassName?: string;
        imageClassName?: string;
        footerStyles?: {
            containerClassName?: string;
            iconContainerClassName?: string;
            iconInnerContainerClassName?: string;
            iconNumberClassName?: string;
            icon?: string;
        },
        videoStyles?: {
            videoClassName?: string;
            containerClassName?: string;
        }
    };
}
const Post: FunctionComponent<PostProps> = ({ post, styles, displayToolbar }) => {
    const { data: commentsData, } = useGetPostComments(post?._id || '');
    const postViews = post?.views?.length;
    const { user } = appContextVar();
    const { data: likesData } = useGetPostLikes(post?._id || '');
    const { viewPostMutation } = useViewPost();
    const { url, loading, type }: {
        url: string;
        type: string;
        loading: boolean;
    } = useDownloadFile({ fileName: post?.file?.originalname || '' });
    const isVideo = type?.trim()?.toLowerCase()?.includes('video');
    const viewPost = () => {
        viewPostMutation({variables: {postId:post?._id}})
    }
    return (
        <Paper onClick={viewPost} elevation={3} className={`${classes.container} ${styles?.containerClassName}`}>
            {url && isVideo && !loading && <Video
                videoClassName={`${styles?.videoStyles?.videoClassName} ${loading && classes.skeleton}`}
                containerClassName={`${styles?.videoStyles?.containerClassName} ${loading && classes.skeleton}`}
                type={type} link={url} />}
            {url && !isVideo && !loading && <img className={`${classes.image} ${styles?.imageClassName}`} src={url} alt={'post'} />}
            {loading && <Skeleton />}
            {!!post?._id && displayToolbar && <div className={classes.speedDial_container}>
                <VideoFooter
                    postId={post?._id}
                    me={user}
                    creator={post.user || {}}
                    likes={likesData?.getLikes?.likes}
                    comments={commentsData?.getComments?.comments} styles={styles?.footerStyles} />
            </div>}
            {!!post?._id && !displayToolbar && <div className={classes.views}><p>{postViews} <FaEye /></p></div>}
        </Paper>

    );
}

export default Post;