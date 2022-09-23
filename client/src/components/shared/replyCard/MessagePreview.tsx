import { FunctionComponent } from "react";
import { appContextVar } from "../../../services/store";
import classes from './ReplyCard.module.css';
export interface MessagePreviewProps { creator: any, content: string | undefined }
export const MessagePreview: FunctionComponent<MessagePreviewProps> = ({ creator, content }) => {
    const { user: me } = appContextVar();
    const isMe = me._id === creator?._id
    return <div className={classes.details}>
        <div className={`${classes.content_container} ${isMe ? classes.me : classes.other}`}>
            <div className={`${classes.creator} ${isMe ? classes.creator_me : classes.creator_other}`}>{isMe ? 'You' : creator?.name}</div>
            <div className={classes.content}>{content}</div>
        </div>
    </div>;
}