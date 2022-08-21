import { FunctionComponent, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useCommentPost, useGetPostComments } from "../../hooks";
import { Button, Input, Spinner, Tree } from "../shared";
import Comment from "./Comment";
import classes from './Comment.module.css';
interface CommentsThreadProps {

}

const CommentsThread: FunctionComponent<CommentsThreadProps> = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [commentContent, setCommentContent] = useState<string>('');
    const [replyTo, setReplyTo] = useState<{ commentId?: string, setChild?: React.Dispatch<React.SetStateAction<any[]>> }>();
    const [comments, setComments] = useState<any[]>([]);
    const { commentPostMutation } = useCommentPost();
    const { loading, fetchMore } = useGetPostComments(postId || '', (data) => {
        if (data?.getComments?.comments) {
            setComments(data?.getComments?.comments)
        }
    });
    const handleCommentSave = async (event: any) => {
        await commentPostMutation({
            variables: {
                postId: postId,
                content: commentContent,
                commentId: replyTo?.commentId
            },
            onCompleted: (data) => {
                if (!replyTo?.commentId) {
                    setComments((prev) => {
                        const newComments = [...prev];
                        newComments.push(data.commentPost);
                        return newComments;
                    })
                } else if (replyTo?.setChild) {
                    replyTo?.setChild((prev: any[]) => {
                        const newComments = [...prev];
                        newComments.push(data.commentPost);
                        return newComments;
                    })
                }
                setReplyTo(undefined)
                setCommentContent('')
            }
        })
    }
    const handleCommentContentChange = (event: any) => {
        const value = event.target.value;
        setCommentContent(value)
    }

    const handleFetchChildren = async (data: any) => {
        const { data: fetchData } = await fetchMore({
            variables: {
                postId,
                commentId: data?._id
            },
        });
        return fetchData?.getComments?.comments || []
    }
    const renderComment = (data: any, setChild: (data: any[]) => void) => {
        return <Comment
            setChild={setChild}
            setReplyTo={setReplyTo}
            key={data._id}
            _id={data._id}
            content={data.content}
            user={data.user}
            createdAt={data.createdAt} />
    }
    return (
        <div className={classes.container}>
            <Button handleClick={() => navigate(-1)}>Back</Button>
            {loading && <Spinner label="loading..." />}
            <Tree
                styles={{ treeClassName: classes.comments }}
                data={comments}
                fetchMore={handleFetchChildren}
                renderItem={renderComment} />
            <div className={classes.footer}>
                <Input handleChange={handleCommentContentChange}
                    type={'text'}
                    name={'comment'}
                    className={''}
                    required={true}
                    placeholder={(replyTo?.commentId || '') + 'write a comment...'}
                    value={commentContent}
                />
                <Button disabled={!commentContent} handleClick={handleCommentSave}>
                    Save comment
                </Button>
            </div>
        </div>
    );
}

export default CommentsThread;