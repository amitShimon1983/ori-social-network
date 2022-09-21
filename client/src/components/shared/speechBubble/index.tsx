import { FunctionComponent } from "react";
import { appContextVar } from "../../../services/store";
import classes from './index.module.css';
interface SpeechBubbleProps {
    message: { [key: string]: any }
    onClickHandler: () => void | Promise<void>
}

const SpeechBubble: FunctionComponent<SpeechBubbleProps> = ({ onClickHandler, message }) => {
    const { content, sender } = message;
    const { user: me } = appContextVar();
    const isMe = me._id === sender._id
    return (<>
        <div onClick={onClickHandler} className={`${classes.speech_bubble} ${isMe ? classes.me : classes.other}`}>
            {content}
        </div>
    </>);
}

export default SpeechBubble;