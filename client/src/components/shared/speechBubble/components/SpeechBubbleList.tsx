import { forwardRef, ForwardRefExoticComponent } from "react";
import SpeechBubble from "./SpeechBubble";
import classes from './index.module.css';
interface SpeechBubbleListProps {
    items: any[];
    onItemClick: (item: any) => void | Promise<void>
}

const SpeechBubbleList: ForwardRefExoticComponent<SpeechBubbleListProps & React.RefAttributes<HTMLSpanElement>> = forwardRef<HTMLSpanElement, SpeechBubbleListProps>(({ items, onItemClick }, ref) => {
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
                {isLast && <span ref={ref}></span>}
            </span>
        })}</>);
})

export default SpeechBubbleList;