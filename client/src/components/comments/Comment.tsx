import { FunctionComponent } from "react";
import { getPostDate } from "../../services/data";
import Me from "../me";
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
    const date = new Date(+createdAt);
    const diff = getPostDate(date)
    return (<div className={classes.comment_container}>
        <div className={classes.comment_header}>
            <div>
                <Me imageClass={classes.image} displayDetails={false} user={user} />
            </div>
            <div className={classes.date}> {diff}</div>
        </div>
        <div>{content}</div>
    </div>);
}

export default Comment;