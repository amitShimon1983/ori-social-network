import { FunctionComponent } from "react";
import { getPostDate } from "../../../services/date";
import { appContextVar } from "../../../services/store";
import classes from './index.module.css';
interface SpeechBubbleProps {
    message: { [key: string]: any }
    onClickHandler: () => void | Promise<void>
}

const SpeechBubble: FunctionComponent<SpeechBubbleProps> = ({ onClickHandler, message }) => {
    const { content, sender, createdAt } = message;
    const { user: me } = appContextVar();
    const isMe = me._id === sender._id
    const diff = getPostDate(new Date(+createdAt));
    return (<>
        <div onClick={onClickHandler} className={`${classes.speech_bubble} ${isMe ? classes.me : classes.other}`}>
            <div className={classes.details}>
                <div className={classes.time_stamp}>
                    {diff}
                </div>
                <div>
                    {content}
                </div>
            </div>
        </div>
    </>);
}

export default SpeechBubble;