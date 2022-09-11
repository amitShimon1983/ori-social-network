import { FunctionComponent, useEffect, useRef, useState } from "react";
import { getPostDate } from "../../services/date";
import { isOverflow } from "../../utils";
import Me from "../me";
import MiniMe from "../me/MiniMe";
import { Button } from "../shared";
import classes from './Comment.module.css';
interface CommentProps {
    _id: string;
    content: string;
    createdAt: string;
    user: any;
}

const Comment: FunctionComponent<CommentProps> = ({ _id,
    content,
    createdAt,
    user }) => {

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

    return (<div className={classes.comment_container}>
        <div className={classes.comment_header}>
            <div className={classes.comment_details}>
                <div className={classes.mini_me_container}>
                    <MiniMe navigateOnClick={true} user={user} displaySpinner={false} />
                </div>
                <div className={classes.date}> {diff}</div>
            </div>
        </div>
        <div ref={contentRef} className={`${classes.content} ${toggle && classes.content_overflow}`}>{content}</div>
        {isContentOverflow && <div className={classes.read_more_button_container}>
            <Button className={classes.read_more_button} handleClick={toggleReadMore}>read {toggle ? 'less...' : 'more...'}</Button>
        </div>}
    </div>);
}

export default Comment;