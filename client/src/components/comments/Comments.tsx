import { FunctionComponent, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useCommentPost, useGetPostComments } from "../../hooks";
import { Button, Input, Spinner, Tree } from "../shared";
import classes from './Comment.module.css';
interface CommentsThreadProps {

}

const CommentsThread: FunctionComponent<CommentsThreadProps> = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [commentContent, setCommentContent] = useState<string>('')
    const { commentPostMutation } = useCommentPost();
    const { data, error, loading, fetchMore } = useGetPostComments(postId || '');
    const handleCommentSave = (data: any) => {
        commentPostMutation({
            variables: {
                postId: postId,
                content: commentContent,
                commentId: data?.commentId
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
                commentId: data?.commentId
            },
        });
        return fetchData?.getComments?.comments || []
    }
    return (
        <div className={classes.container}>
            <Button handleClick={() => navigate(-1)}>Back</Button>
            {loading && <Spinner label="loading..." />}
            <Tree styles={{ treeClassName: classes.comments }} data={data?.getComments?.comments || []} fetchMore={handleFetchChildren} />
            <div className={classes.footer}>
                <Input handleChange={handleCommentContentChange}
                    type={'text'}
                    name={'comment'}
                    className={''}
                    required={true}
                    placeholder={'write a comment...'}
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