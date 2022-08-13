import { FunctionComponent } from "react";
import { BiLike, FaRegComments } from "../shared";
import classes from './VideoFooter.module.css';
interface VideoFooterProps {
    likes?: any[];
    comments?: any[];
    me: { [key: string]: any }
}

const VideoFooter: FunctionComponent<VideoFooterProps> = ({ likes, me, comments }) => {
    const iLikeIt = !!likes?.length && likes.find((like: any) => like.user._id === me._id)
    const onLikeClick = () => {
        if (iLikeIt) {

        } else {

        }
    }
    const onCommentClick = () => {

    }
    return (<div className={classes.container}>
        <div className={classes.icon_container}>
            <BiLike onClick={onLikeClick} className={`${classes.like_icon} ${iLikeIt ? classes.like_icon_selected : classes.like_icon_not_selected}`} />
            <FaRegComments onClick={onCommentClick} className={classes.comment_icon} />
            {!!likes?.length && (iLikeIt ? <span>you and {likes?.length - 1} like this</span> : <span>{likes[0]?.user?.name} and {likes?.length - 1} like this</span>)}
        </div>
        <div>
            {!likes?.length && <div>be the first to like this...</div>}
            {!!comments?.length && <div>view {comments?.length} comments</div>}
        </div>
    </div>
    );
}

export default VideoFooter;