import { FunctionComponent } from "react";
import classes from './ReplyCard.module.css';
export interface MessagePreviewProps { isMe: boolean, creator: any, content: string | undefined }
export const MessagePreview: FunctionComponent<MessagePreviewProps> = ({ isMe, creator, content }) => {
    return <div className={classes.details}>
        <div className={`${classes.content_container} ${isMe ? classes.me : classes.other}`}>
            <div className={`${classes.creator} ${isMe ? classes.creator_me : classes.creator_other}`}>{creator?.name}</div>
            <div className={classes.content}>{content}</div>
        </div>
    </div>;
}