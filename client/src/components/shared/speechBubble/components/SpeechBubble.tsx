import { FunctionComponent } from "react";
import { getPostDate } from "../../../../services/date";
import { appContextVar } from "../../../../services/store";
import MiniMe from "../../../me/MiniMe";
import { ReadMore } from "../../readMore";
import classes from './index.module.css';
interface SpeechBubbleProps {
    message: { [key: string]: any }
    onClickHandler: (e: any) => void | Promise<void>
}

const SpeechBubble: FunctionComponent<SpeechBubbleProps> = ({ onClickHandler, message }) => {
    const { content, sender, createdAt } = message;
    const { user: me } = appContextVar();
    const isMe = me._id === sender._id
    const diff = getPostDate(new Date(+createdAt));

    return (<div className={classes.container}>
        <div onClick={onClickHandler} className={`${isMe ? classes.speech_bubble_me : classes.speech_bubble_other} ${isMe ? classes.me : classes.other}`}>
            {!!message?.parentMessageId?._id &&
                <div style={{ padding: '10px', width: '90%', textAlign: 'center', overflow: 'hidden', color: 'white', height: '2vh', flexWrap: 'wrap', textOverflow: 'ellipsis' }} onClick={() => {
                    const elem = document.getElementById(message.parentMessageId._id);
                    elem?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' })

                }}>...{message?.parentMessageId?.content}
                </div>}
            <div className={classes.details}>
                <div className={classes.time_stamp}>
                    {diff}
                </div>
                <ReadMore content={content} displayButtons={true} />
            </div>
        </div>
        {!isMe && <MiniMe styles={{
            imageClass: classes.image
        }} displayEmailAddress={false} navigateOnClick={false} user={sender} displaySpinner={false} />}
    </div>);
}

export default SpeechBubble;