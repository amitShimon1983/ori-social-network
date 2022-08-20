import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLikePost } from "../../hooks";
import { BiLike, FaRegComments } from "../shared";
import classes from './VideoFooter.module.css';
interface VideoFooterProps {
    likes?: any[];
    comments?: any[];
    me: { [key: string]: any }
    postId: string;
}

const VideoFooter: FunctionComponent<VideoFooterProps> = ({ likes, me, comments, postId }) => {
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
    return (<div className={classes.container}>
        <div className={classes.icon_container}>
            <div className={classes.icon_inner_container}>
                <BiLike onClick={onLikeClick} className={`${classes.like_icon} ${iLikeIt ? classes.like_icon_selected : classes.like_icon_not_selected}`} />
                {!!internalLikes?.length && <div className={`${classes.like_icon_number}`}>{internalLikes?.length || 0}</div>}
            </div>
            <div className={classes.icon_inner_container}>
                <FaRegComments onClick={onCommentClick} className={classes.comment_icon} />
                {!!internalLikes?.length && <div className={`${classes.comment_icon_number}`}>{internalLikes?.length || 0}</div>}
            </div>
        </div>
        <div>
            {!!comments?.length && <div>view {comments?.length} comments</div>}
        </div>
    </div>
    );
}

export default VideoFooter;