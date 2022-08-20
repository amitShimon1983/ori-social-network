import { FunctionComponent, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useCommentPost, useGetPostComments } from "../../hooks";
import { Button, Input, Spinner, Tree } from "../shared";

interface CommentsThreadProps {

}

const CommentsThread: FunctionComponent<CommentsThreadProps> = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [commentContent, setCommentContent] = useState<string>('')
    const { commentPostMutation } = useCommentPost();
    const { data, error, loading, fetchMore } = useGetPostComments(postId || '');
    console.log({ postId, data, error });
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
    return (<>
        <Button handleClick={() => navigate(-1)}>Back</Button>
        {loading && <Spinner label="loading..." />}
        <Tree data={[]} fetchMore={fetchMore} >
            <Input handleChange={handleCommentContentChange}
                type={'text'}
                name={'comment'}
                className={'comment'}
                required={true}
                placeholder={'write a comment...'}
                value={commentContent}
            />
            <Button disabled={!commentContent} handleClick={handleCommentSave}>
                Save comment
            </Button>
        </Tree>
    </>);
}

export default CommentsThread;