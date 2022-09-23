import { FunctionComponent } from "react";
import classes from './ReplyCard.module.css';
import { appContextVar } from "../../../services/store";
import { CloseButton } from "../closeButton";
import { MessagePreview } from "./MessagePreview";
interface ReplyCardProps {
    handleDismiss?: (event: any) => void | Promise<void>
    content?: string;
    creator?: any;
    display?: boolean;
}

const ReplyCard: FunctionComponent<ReplyCardProps> = ({ display, handleDismiss, content, creator }) => {
    const { user: me } = appContextVar();
    const isMe = me._id === creator?._id
    return (<>
        <div className={`${classes.container} ${isMe ? classes.container_me : classes.container_other} ${display ? classes.display : classes.hide}`}>
            <MessagePreview creator={creator} content={content} />
            {handleDismiss && <CloseButton className={classes.icon} onClick={handleDismiss} />}
        </div>
    </>);
}

export default ReplyCard;

