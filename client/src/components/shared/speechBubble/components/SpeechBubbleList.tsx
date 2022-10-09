import { FunctionComponent } from "react";
import SpeechBubble from "./SpeechBubble";
import classes from './index.module.css';
import InfiniteScroll from "../../infiniteScrolling/InfiniteScroll";
interface SpeechBubbleListProps {
    items: any[];
    onItemClick: (item: any) => void | Promise<void>;
    fetchMore: (skip: number) => Promise<{
        items: any[];
        hasMore: boolean;
    }>;
    hasMore: boolean;
}

const SpeechBubbleList: FunctionComponent<SpeechBubbleListProps> = ({ items, onItemClick, fetchMore, hasMore }) => {

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
    return (<InfiniteScroll
        styles={{ container: classes.list, lastItem: classes.last_item }}
        initialHasMore={hasMore}
        renderItem={renderItem}
        initialData={items}
        fetchMore={fetchMore} />)
}

export default SpeechBubbleList;