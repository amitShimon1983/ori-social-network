import { FunctionComponent, useEffect, useRef, useState } from "react";
import SpeechBubble from "./SpeechBubble";
import classes from './index.module.css';
interface SpeechBubbleListProps {
    items: any[];
    onItemClick: (item: any) => void | Promise<void>;
}

const SpeechBubbleList: FunctionComponent<SpeechBubbleListProps> = ({ items, onItemClick }) => {
   
    return (<>
        {items?.map((item: any) => {
            return <span
                className={classes.speech_container}
                key={`SpeechBubble_${item._id}_item_Form_ref`}
            >
                <SpeechBubble
                    onClickHandler={onItemClick}
                    key={`SpeechBubble_${item._id}_item_Form`}
                    message={item}
                />
            </span>
        })}
    </>);
}

export default SpeechBubbleList;