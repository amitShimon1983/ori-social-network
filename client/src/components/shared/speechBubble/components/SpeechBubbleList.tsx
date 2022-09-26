import {  FunctionComponent, useEffect, useRef } from "react";
import SpeechBubble from "./SpeechBubble";
import classes from './index.module.css';
interface SpeechBubbleListProps {
    items: any[];
    onItemClick: (item: any) => void | Promise<void>
}

const SpeechBubbleList: FunctionComponent<SpeechBubbleListProps> = ({ items, onItemClick }) => {
    let innerRef = useRef<HTMLSpanElement>(null);
    useEffect(() => {
        setTimeout(() => {
            innerRef?.current?.scrollIntoView({ behavior: 'auto', block: 'end', inline: 'end' });
        }, 600)
    }, [items?.length])
    return (<>
        {items?.map((item: any, idx: number) => {
            const isLast = idx === items?.length - 1;
            return <span
                className={classes.speech_container}
                key={`SpeechBubble_${item._id}_item_Form_ref`}
            >
                <SpeechBubble
                    onClickHandler={onItemClick}
                    key={`SpeechBubble_${item._id}_item_Form`}
                    message={item}
                />
                {isLast && <span ref={innerRef}>last</span>}
            </span>
        })}</>);
}

export default SpeechBubbleList;