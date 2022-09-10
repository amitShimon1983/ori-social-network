import { FunctionComponent } from "react";
import classes from './index.module.css';
interface SpeechBubbleProps {
    content: string;
    fromMe: boolean;
}

const SpeechBubble: FunctionComponent<SpeechBubbleProps> = ({ content, fromMe }) => {
    return (<>
        <div className={`${fromMe ? classes.speech_bubble_me : classes.speech_bubble_other} ${fromMe ? classes.me : classes.other}`}>{content}</div>
    </>);
}

export default SpeechBubble;