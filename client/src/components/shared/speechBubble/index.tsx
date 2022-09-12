import { FunctionComponent } from "react";
import { appContextVar } from "../../../services/store";
import classes from './index.module.css';
interface SpeechBubbleProps {
    content: string;
    userId: string;
}

const SpeechBubble: FunctionComponent<SpeechBubbleProps> = ({ content, userId }) => {
    const { user: me } = appContextVar();
    const isMe = me._id === userId
    return (<>
        <div className={`${isMe ? classes.speech_bubble_me : classes.speech_bubble_other} ${isMe ? classes.me : classes.other}`}>{content}</div>
    </>);
}

export default SpeechBubble;