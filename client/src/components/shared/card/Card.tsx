import { FunctionComponent, useEffect, useRef, useState } from "react";
import { getPostDate } from "../../../services/date";
import { isOverflow } from "../../../utils";
import MiniMe from "../../me/MiniMe";
import Button from "../button/Button";

import classes from './Card.module.css';
interface CardProps {
    _id: string;
    content: string;
    createdAt: string;
    user: any;
    displayButtons: boolean;
    navigateOnClick: boolean;
}

const Card: FunctionComponent<CardProps> = ({ _id,
    content,
    createdAt,
    user,
    displayButtons,
    navigateOnClick }) => {

    const [isContentOverflow, setIsContentOverFlow] = useState<boolean>(false);
    const [toggle, setToggle] = useState<boolean>(false);
    let contentRef = useRef(null);
    const date = new Date(+createdAt);
    const diff = getPostDate(date);

    useEffect(() => {
        if (contentRef?.current && isOverflow(contentRef.current)) {
            setIsContentOverFlow(true)
        }
    }, [contentRef])

    const toggleReadMore = () => setToggle(prev => !prev);

    return (<div className={classes.container}>
        <div className={classes.header}>
            <div className={classes.details}>
                <div className={classes.mini_me_container}>
                    <MiniMe displayEmailAddress={true} navigateOnClick={navigateOnClick} user={user} displaySpinner={false} />
                </div>
                <div className={classes.date}> {diff}</div>
            </div>
        </div>
        <div ref={contentRef} className={`${classes.content} ${toggle && classes.content_overflow}`}>{content}</div>
        {isContentOverflow && displayButtons && <div className={classes.read_more_button_container}>
            <Button className={classes.read_more_button} handleClick={toggleReadMore}>read {toggle ? 'less...' : 'more...'}</Button>
        </div>}
    </div>);
}

export default Card;