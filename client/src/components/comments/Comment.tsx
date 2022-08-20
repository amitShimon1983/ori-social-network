import { FunctionComponent } from "react";

interface CommentProps {
    _id: string;
    content: string;
    createdAt: string;
    user: string;
}

const Comment: FunctionComponent<CommentProps> = ({ _id,
    content,
    createdAt,
    user }) => {
    const date = new Date(+createdAt)
    return (<>
        <div style={{ display: 'flex' }}>
            <div>{user}&nbsp;</div>
            <div> {date.toLocaleDateString()}</div>
        </div>
        <div>{content}</div>
    </>);
}

export default Comment;