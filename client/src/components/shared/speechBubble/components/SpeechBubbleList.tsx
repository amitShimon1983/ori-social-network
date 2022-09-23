import { forwardRef, ForwardRefExoticComponent } from "react";
import SpeechBubble from "./SpeechBubble";

interface SpeechBubbleListProps {
    items: any[];
    onItemClick: (e: any, item: any) => void | Promise<void>
}

const SpeechBubbleList: ForwardRefExoticComponent<SpeechBubbleListProps & React.RefAttributes<HTMLSpanElement>> = forwardRef<HTMLSpanElement, SpeechBubbleListProps>(({ items, onItemClick }, ref) => {
    return (<>
        {items?.map((item: any, idx: number) => {
            const isLast = idx === items?.length - 1;
            return <span
                id={item._id}
                style={{ padding: 16, width: '100%' }}
                key={`SpeechBubble_${item._id}_item_Form_ref`}
            >
                <SpeechBubble
                    onClickHandler={(e) => onItemClick(e, item)}
                    key={`SpeechBubble_${item._id}_item_Form`}
                    message={item}
                />
                {isLast && <span ref={ref}>last item</span>}
            </span>
        })}</>);
})

export default SpeechBubbleList;