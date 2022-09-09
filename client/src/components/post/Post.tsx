import { FunctionComponent, useEffect, useState } from "react";
import { Video } from "../video";
import { VideoFooter } from "../videoFooter";
import { appConfig } from "../../configuration";
import { httpService } from "../../services";
import { PostDetails } from "./types";
import classes from './Post.module.css';
import { appContextVar } from "../../services/store";
import { useGetPostComments, useGetPostLikes } from "../../hooks";
import { Skeleton, Spinner } from "../shared";

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
const filesUri = `${appConfig.serverUrl}${'/api/file/post/'}`
const Post: FunctionComponent<PostProps> = ({ post, styles, displayToolbar }) => {
    const { data: commentsData, } = useGetPostComments(post?._id || '');
    const { user } = appContextVar();
    const [url, setUrl] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [displaySkeleton, setDisplaySkeleton] = useState<boolean>(false);
    const [type, setType] = useState<string>('');
    const { data: likesData } = useGetPostLikes(post?._id || '');

    useEffect(() => {
        setLoading(true);
        setDisplaySkeleton(true);
        let timer: any;
        const loadFile = async () => {
            const blob: any = await httpService.getStream(filesUri + post?.file?.originalname);
            const objectURL = URL.createObjectURL(blob);
            setType(blob?.type);
            setUrl(objectURL);
            setLoading(false);
            timer = setTimeout(() => { setDisplaySkeleton(false) }, 300)
        }
        loadFile();
        return () => {
            timer && clearTimeout(timer)
        }
    }, [])

    const isVideo = type?.trim()?.toLowerCase()?.includes('video');

    return (<div className={`${classes.container} ${styles?.containerClassName}`}>
        {url && isVideo && !loading && <Video
            videoClassName={`${styles?.videoStyles?.videoClassName} ${displaySkeleton && classes.skeleton}`}
            containerClassName={`${styles?.videoStyles?.containerClassName} ${displaySkeleton && classes.skeleton}`}
            type={type} link={url} />}
        {url && !isVideo && !loading && <img className={`${classes.image} ${styles?.imageClassName}`} src={url} alt={'post'} />}
        {displaySkeleton && <Skeleton />}
        {!!post?._id && displayToolbar && <div className={classes.speedDaild_container}>
            <VideoFooter
                postId={post?._id}
                me={user}
                likes={likesData?.getLikes?.likes}
                comments={commentsData?.getComments?.comments} styles={styles?.footerStyles} />
        </div>}

    </div>);
}

export default Post;