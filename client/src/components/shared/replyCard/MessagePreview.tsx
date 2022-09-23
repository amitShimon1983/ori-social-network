import { FunctionComponent } from "react";
import { appContextVar } from "../../../services/store";
import { UserDetails } from "../userDetail";
import classes from './ReplyCard.module.css';
export interface MessagePreviewProps { creator: any, content: string | undefined }
export const MessagePreview: FunctionComponent<MessagePreviewProps> = ({ creator, content }) => {
    const { user: me } = appContextVar();
    const isMe = me._id === creator?._id
    return <div className={classes.details}>
        <div className={`${classes.content_container} ${isMe ? classes.me : classes.other}`}>
            <UserDetails user={creator} />
            <div className={classes.content}>{content}</div>
        </div>
    </div>;
}
