import { FunctionComponent } from "react";
import { getPostDate } from "../../../services/date";
import { appContextVar } from "../../../services/store";
import MiniMe from "../../me/MiniMe";
import { ReadMore } from "../readMore";
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
    return (<div className={classes.container}>
        <div onClick={onClickHandler} className={`${classes.speech_bubble} ${isMe ? classes.me : classes.other}`}>
            <div className={classes.details}>
                <div className={classes.time_stamp}>
                    {diff}
                </div>
                <ReadMore content={content} displayButtons={true} />
                {/* <div>
                    {content}
                </div> */}
            </div>
        </div>
        {!isMe && <MiniMe styles={{
            imageClass: classes.image
        }} displayEmailAddress={false} navigateOnClick={false} user={sender} displaySpinner={false} />}
    </div>);
}

export default SpeechBubble;