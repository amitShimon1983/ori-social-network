import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLikePost } from "../../hooks";
import Me from "../me";
import { FcLike, FaRegComments, GiArrowDunk, BsCloudDownload, ToolbarButton, Badge } from "../shared";
import classes from './VideoFooter.module.css';
interface VideoFooterProps {
    likes?: any[];
    comments?: any[];
    me: { [key: string]: any };
    creator: { [key: string]: any };
    postId: string;
    styles?: {
        containerClassName?: string;
        iconContainerClassName?: string;
        iconInnerContainerClassName?: string;
        iconNumberClassName?: string;
        icon?: string;
    }
}

const VideoFooter: FunctionComponent<VideoFooterProps> = ({ likes, me, comments, postId, styles, creator }) => {
    const [internalLikes, setLikes] = useState<any[]>([]);
    const { likePostMutation } = useLikePost();
    const myLikeIndex = !!internalLikes?.length ? internalLikes.findIndex((like: any) => like.user === me._id) : -1;
    const iLikeIt = myLikeIndex !== -1;
    const navigate = useNavigate();
    useEffect(() => {
        if (likes?.length) {
            setLikes(likes)
        }
    }, [likes])

    const onLikeClick = async () => {
        if (iLikeIt) {
            likePostMutation({
                variables: {
                    action: 'dislike',
                    postId
                }
            });
            setLikes(prev => {
                const newPosts = [...prev]
                newPosts.splice(myLikeIndex, 1);
                return newPosts
            })
        } else {
            const { data } = await likePostMutation({
                variables: {
                    action: 'like',
                    postId
                }
            });
            if (data?.likePost?._id) {
                setLikes(prev => {
                    const newPosts = [...prev]
                    newPosts.push(data?.likePost);
                    return newPosts;
                })
            }
        }
    }
    const onCommentClick = () => {
        navigate('/comments/' + postId)
    }
    return (
        <ToolbarButton actions={[
            { icon: <Me displayEmailAddress={true}  navigateOnClick={true} displaySpinner={false} user={creator} styles={{ emailClassName: classes.me_email, imageClass: classes.me_image, containerClassName: classes.me_container }} />, name: 'Avatar' },
            {
                icon: <Badge max={99} count={comments?.length || 0}>
                    <FaRegComments className={classes.icon} onClick={onCommentClick} />
                </Badge>,
                name: 'Comments'
            },
            {
                icon: <Badge max={99} count={internalLikes?.length || 0}>
                    <FcLike onClick={onLikeClick} className={`${classes.icon} ${styles?.icon} ${iLikeIt ? classes.like_icon_selected : classes.like_icon_not_selected}`} />
                </Badge>,
                name: 'Liks'
            },
            { icon: <BsCloudDownload />, name: 'Download' },
            { icon: <GiArrowDunk />, name: 'Share' },
        ]} />
    );
}

export default VideoFooter;