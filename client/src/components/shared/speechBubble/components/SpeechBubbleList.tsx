import { FunctionComponent, useEffect, useRef, useState } from "react";
import SpeechBubble from "./SpeechBubble";
import classes from './index.module.css';
import Skeleton from "../../skeleton";
interface SpeechBubbleListProps {
    items: any[];
    onItemClick: (item: any) => void | Promise<void>;
    displayInitialLoader: boolean;
}

const SpeechBubbleList: FunctionComponent<SpeechBubbleListProps> = ({ items, onItemClick, displayInitialLoader }) => {
    let innerRef = useRef<HTMLSpanElement>(null);
    const [displaySkeleton, setDisplaySkeleton] = useState<boolean>(true);
    useEffect(() => {
        if (!displayInitialLoader) {
            setDisplaySkeleton(displayInitialLoader)
        }
        if (displaySkeleton && displayInitialLoader) {
            let timer = setTimeout(() => {
                setDisplaySkeleton(false)
                innerRef?.current?.scrollIntoView({
                    block: "end",
                    inline: "end",
                    behavior: "smooth"
                });
            }, 3500);
            return () => {
                return clearTimeout(timer)
            }
        } else {
            innerRef?.current?.scrollIntoView({
                block: "end",
                inline: "end",
                behavior: "smooth"
            });
        }
    }, [items?.length, displaySkeleton, displayInitialLoader])
    return (<>
        {items?.map((item: any, idx: number) => {
            const isLast = idx === items?.length - 1;
            return <span
                className={classes.speech_container}
                key={`SpeechBubble_${item._id}_item_Form_ref`}
            >
                {displaySkeleton && <Skeleton />}
                <SpeechBubble
                    onClickHandler={onItemClick}
                    key={`SpeechBubble_${item._id}_item_Form`}
                    message={item}
                />
                {isLast && <span ref={innerRef}>last</span>}
            </span>
        })}
    </>);
}

export default SpeechBubbleList;