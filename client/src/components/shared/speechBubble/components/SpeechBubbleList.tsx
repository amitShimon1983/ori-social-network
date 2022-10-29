import { FunctionComponent, useCallback, useRef, useState } from "react";
import SpeechBubble from "./SpeechBubble";
import classes from './index.module.css';
import InfiniteScroll from "../../infiniteScrolling/InfiniteScroll";
import { Fab, FaPencilAlt } from "../..";
interface SpeechBubbleListProps {
    items: any[];
    setReplyTo: React.Dispatch<any>;
    fetchMore: (skip: number) => Promise<{
        items: any[];
        hasMore: boolean;
    }>;
    hasMore: boolean;
}

const SpeechBubbleList: FunctionComponent<SpeechBubbleListProps> = ({ items, fetchMore, hasMore, setReplyTo }) => {
    const onItemClick: (item: any) => void | Promise<void> = (item) => {
        setReplyTo(item);
    };
    const [displayButton, setDisplayButton] = useState<boolean>(false);
    const observer = useRef<any>(null);
    const firstItemRef = useCallback((node: any) => {

        if (observer.current) {
            observer.current.disconnect()
        }

        observer.current = new IntersectionObserver(entries => {
            if (!entries[0].isIntersecting) {
                setDisplayButton(true)
            } else {
                setDisplayButton(false)
            }
        });

        if (node) {
            observer.current.observe(node)
        }
    }, [])
    const renderItem = (message: any, idx?: number) => {
        return (
            <span
                id={idx === 0 ? 'first_message' : message._id}
                ref={idx === 0 ? firstItemRef : null}
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
        {displayButton && <Fab 
        onClick={() => {
            document.getElementById('first_message')?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'end' })
        }} className={`${classes.fab}`} color="primary" aria-label="edit">
            <FaPencilAlt />
        </Fab>}
    </>
    )
}

export default SpeechBubbleList;