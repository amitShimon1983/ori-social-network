import { FunctionComponent, useEffect, useRef, useState } from "react";
import { isOverflow } from "../../../utils";
import Button from "../button/Button";
import classes from './ReadMore.module.css';
interface ReadMoreProps {
    displayButtons: boolean;
    content: string;
}

const ReadMore: FunctionComponent<ReadMoreProps> = ({ displayButtons, content }) => {
    const [isContentOverflow, setIsContentOverFlow] = useState<boolean>(false);
    const [toggle, setToggle] = useState<boolean>(false);
    let contentRef = useRef(null);


    useEffect(() => {
        if (contentRef?.current && isOverflow(contentRef.current)) {
            setIsContentOverFlow(true)
        }
    }, [contentRef])

    const toggleReadMore = () => setToggle(prev => !prev);

    return (<>
        <div ref={contentRef} className={`${classes.content} ${!toggle ? classes.content_overflow_close : classes.content_overflow_open}`}>{content}</div>

        {isContentOverflow && displayButtons && <div className={classes.read_more_button_container}>
            <Button variant="text" className={classes.read_more_button} handleClick={toggleReadMore}>read {toggle ? 'less...' : 'more...'}</Button>
        </div>}
    </>
    );
}

export default ReadMore;