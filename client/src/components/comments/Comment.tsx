import { FunctionComponent } from "react";

interface CommentProps {
    _id: string;
    content: string;
    createdAt: string;
    user: string;
    setReplyTo: (id: any) => void;
    setChild: (data: any[]) => void;
}

const Comment: FunctionComponent<CommentProps> = ({ _id,
    setReplyTo,
    setChild,
    content,
    createdAt,
    user }) => {
    const date = new Date(+createdAt);

    return (<>
        <div style={{ display: 'flex' }}>
            <div>{user}&nbsp;</div>
            <div> {date.toLocaleDateString()}</div>
        </div>
        <div>{content}</div>
        <div onClick={(event) => {
            event.stopPropagation();
            setReplyTo({ commentId: _id, setChild });
        }}>Reply To</div>
    </>);
}

export default Comment;