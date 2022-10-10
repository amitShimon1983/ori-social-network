import { FunctionComponent } from "react";
import SpeechBubble from "./SpeechBubble";
import classes from './index.module.css';
import InfiniteScroll from "../../infiniteScrolling/InfiniteScroll";
import { ReplyCard } from "../../replyCard";
interface SpeechBubbleListProps {
    items: any[];
    replyTo: any;
    setReplyTo: React.Dispatch<any>;
    fetchMore: (skip: number) => Promise<{
        items: any[];
        hasMore: boolean;
    }>;
    hasMore: boolean;
}

const SpeechBubbleList: FunctionComponent<SpeechBubbleListProps> = ({ items, fetchMore, hasMore, setReplyTo, replyTo }) => {
    const onItemClick: (item: any) => void | Promise<void> = (item) => {
        setReplyTo(item);
    };
    const handleReplyCardDismiss = (e: any) => { e.stopPropagation(); setReplyTo(undefined); }
    const renderItem = (message: any) => {
        return (
            <span
                className={classes.speech_container}
                key={`SpeechBubble_${message._id}_item_Form_ref`}
            >
                <SpeechBubble
                    onClickHandler={onItemClick}
                    key={`SpeechBubble_${message._id}_item_Form`}
                    message={message}
                />
            </span>
        )
    }
    return (<>
        <InfiniteScroll
            styles={{ container: classes.list, lastItem: classes.last_item }}
            initialHasMore={hasMore}
            renderItem={renderItem}
            initialData={items}
            fetchMore={fetchMore} />
        <ReplyCard display={!!replyTo} creator={replyTo?.sender} content={replyTo?.content} handleDismiss={handleReplyCardDismiss} />
    </>
    )
}

export default SpeechBubbleList;