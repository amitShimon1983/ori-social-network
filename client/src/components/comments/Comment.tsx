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
            <div className={classes.comment_details}>
                <div className={classes.comment_me}>
                    <Me
                        styles={{
                            imageClass: classes.me_image,
                            containerClassName: classes.me_container,
                            emailClassName: classes.me_email
                        }}
                        displayDetails={false}
                        user={user}
                    />
                </div>
                <div className={classes.date}> {diff}</div>
            </div>
        </div>
        <div className={classes.content}>{content}</div>
    </div>);
}

export default Comment;