import { FunctionComponent, useEffect } from "react";
import { MediaCard } from "../..";
import { useUpdateMessage } from "../../../../hooks";
import { getPostDate } from "../../../../services/date";
import { appContextVar } from "../../../../services/store";
import MiniMe from "../../../me/MiniMe";
import { BsCheck2, BsCheck2All } from "../../icons";
import { ReadMore } from "../../readMore";
import { MessagePreview } from "../../replyCard/MessagePreview";
import { UserDetails } from "../../userDetail";
import classes from './index.module.css';
interface SpeechBubbleProps {
    message: { [key: string]: any }
    onClickHandler: (message: any) => void | Promise<void>;
}

const SpeechBubble: FunctionComponent<SpeechBubbleProps> = ({ onClickHandler, message }) => {
    const { content, sender, createdAt, isRead, type } = message;
    const { user: me } = appContextVar();
    const isMe = me._id === sender._id;
    const { updateMessage }: {
        updateMessage: (messageId: string, skip: boolean) => Promise<void>
    } = useUpdateMessage();
    useEffect(() => {
        if (message?._id && !isMe && !message.isRead) {
            updateMessage(message?._id, isMe)
        }
    }, [])
    const diff = getPostDate(new Date(+createdAt));
    const handleClick = () => {
        const elem = document.getElementById(message.parentMessageId._id);
        elem?.classList.add(classes.selected)
        elem?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
        setTimeout(() => {
            elem?.classList.remove(classes.selected);
        }, 3000)

    }
    return (<div className={classes.container}>
        <div id={message._id} className={`${isMe ? classes.speech_bubble_me : classes.speech_bubble_other} ${isMe ? classes.me : classes.other}`}>
            <div className={classes.message_container} onClick={handleClick}>
                {message?.parentMessageId && <MessagePreview creator={message?.parentMessageId?.sender} content={message.parentMessageId.content} />}
            </div>
            <div onClick={(e) => {
                e.stopPropagation();
                onClickHandler(message);
            }
            } className={classes.details}>
                <UserDetails className={`${isMe ? classes.sender_me : classes.sender_other}`} user={sender} />
                {(!type || type === 'text') && <ReadMore content={content} displayButtons={true} />}
                {(!!type && type !== 'text') && <MediaCard type={type} message={message} isMe={isMe} />}
                <div className={classes.footer}>
                    <span className={classes.time_stamp}>
                        {diff}
                    </span>
                    <span className={classes.icon}>
                        {isRead ? <BsCheck2All /> : <BsCheck2 />}
                    </span>
                </div>
            </div>
        </div>
        {
            !isMe && <MiniMe styles={{
                imageClass: classes.image
            }} displayEmailAddress={false} navigateOnClick={false} user={sender} displaySpinner={false} />
        }
    </div >);
}

export default SpeechBubble;