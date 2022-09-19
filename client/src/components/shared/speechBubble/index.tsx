import { FunctionComponent } from "react";
import { appContextVar } from "../../../services/store";
import classes from './index.module.css';
interface SpeechBubbleProps {
    content: string;
    userId: string;
    onClickHandler: () => void | Promise<void>
}

const SpeechBubble: FunctionComponent<SpeechBubbleProps> = ({ onClickHandler, content, userId }) => {
    const { user: me } = appContextVar();
    const isMe = me._id === userId
    return (<>
        <div onClick={onClickHandler} className={`${isMe ? classes.speech_bubble_me : classes.speech_bubble_other} ${isMe ? classes.me : classes.other}`}>{content}</div>
    </>);
}

export default SpeechBubble;