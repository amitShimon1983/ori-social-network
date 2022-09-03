import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLikePost } from "../../hooks";
import Me from "../me";
import { BiLike, FaRegComments } from "../shared";
import classes from './VideoFooter.module.css';
interface VideoFooterProps {
    likes?: any[];
    comments?: any[];
    me: { [key: string]: any }
    postId: string;
    displayPersona?: boolean;
    styles?: {
        containerClassName?: string;
        iconContainerClassName?: string;
        iconInnerContainerClassName?: string;
        iconNumberClassName?: string;
        icon?: string;
    }
}

const VideoFooter: FunctionComponent<VideoFooterProps> = ({ likes, me, comments, postId, styles, displayPersona }) => {
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
    return (<div className={`${styles?.containerClassName} ${classes.container}`}>
        <div className={`${classes.icon_container} ${styles?.iconContainerClassName}`}>
            <div className={`${classes.icon_inner_container} ${styles?.iconInnerContainerClassName}`}>
                <BiLike onClick={onLikeClick} className={`${classes.icon} ${styles?.icon} ${iLikeIt ? classes.like_icon_selected : classes.like_icon_not_selected}`} />
                {!!internalLikes?.length && <div className={`${classes.icon_number} ${styles?.iconNumberClassName}`}>{internalLikes?.length || 0}</div>}
            </div>
            <div className={`${classes.icon_inner_container} ${styles?.iconInnerContainerClassName}`}>
                <FaRegComments onClick={onCommentClick} className={`${classes.icon} ${styles?.icon}`} />
                {!!comments?.length && <div className={`${classes.icon_number} ${styles?.iconNumberClassName}`}>{comments?.length || 0}</div>}
            </div>
            {displayPersona && <div className={`${classes.icon_inner_container} ${styles?.iconInnerContainerClassName}`}>
                <Me user={me} styles={{ emailClassName: classes.me_email, imageClass: classes.me_image, containerClassName: classes.me_container }} />
            </div>}
        </div>
    </div>
    );
}

export default VideoFooter;