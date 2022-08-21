import { FunctionComponent } from "react";
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

    return (<div className={classes.comment_container}>
        <div className={classes.comment_header}>
            <div>
                <Me imageClass={classes.image} displayDetails={false} user={user} />
            </div>
            <div className={classes.date}> {date.toLocaleDateString()}</div>
        </div>
        <div>{content}</div>
    </div>);
}

export default Comment;