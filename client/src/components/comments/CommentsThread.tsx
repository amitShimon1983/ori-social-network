import { FunctionComponent, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useCommentPost, useGetPostComments } from "../../hooks";
import { Button, Input, Spinner } from "../shared";
import InfiniteScroll from "../shared/infiniteScrolling/InfiniteScroll";
import { TreeNode } from "../shared/tree/Tree";
import Comment from "./Comment";
import classes from './Comment.module.css';
interface CommentsThreadProps {

}
const limit = 20;
const CommentsThread: FunctionComponent<CommentsThreadProps> = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [commentContent, setCommentContent] = useState<string>('');
    const [replyTo, setReplyTo] = useState<{ data?: any, setChild?: React.Dispatch<React.SetStateAction<any[]>> }>();
    const [comments, setComments] = useState<any[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(false);
    const { commentPostMutation } = useCommentPost();
    const { loading, fetchMore, getLazyComment } = useGetPostComments(postId || '', (data) => {
        if (data?.getComments?.comments) {
            setHasMore(data?.getComments?.hasMore)
            setComments(data?.getComments?.comments)
        }
    });
    const handleCommentSave = async (event: any) => {
        await commentPostMutation({
            variables: {
                postId: postId,
                content: commentContent,
                commentId: replyTo?.data?._id
            },
            onCompleted: (data) => {
                if (!replyTo?.data?._id) {
                    setComments((prev) => {
                        const newComments = [...prev];
                        newComments.push(data.commentPost);
                        return newComments;
                    })
                } else if (replyTo?.setChild) {
                    replyTo?.setChild([data.commentPost])
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

    const handleCommentFetch = async (skip: number) => {
        const emptyFetchState = { items: [], hasMore: false }
        if (hasMore) {
            const { data: newData } = await fetchMore({
                variables: {
                    postId: postId,
                    limit,
                    skip
                }
            });
            setHasMore(newData?.getComments.hasMore)
            return { items: newData?.getComments?.comments, hasMore: newData?.getComments.hasMore } || emptyFetchState
        }
        return emptyFetchState
    }
    const handleFetchChildren = async (data: any, skip: number) => {
        console.log({ skip, data });

        const { data: fetchData } = await getLazyComment({
            variables: {
                postId: postId!,
                commentId: data?._id.toString(),
                skip,
                limit
            },
        })
        console.log({ fetchData });

        return fetchData?.getComments?.comments || []
    }
    const renderComment = (data: any) => {
        return <Comment
            key={data._id}
            _id={data._id}
            content={data.content}
            user={data.user}
            createdAt={data.createdAt} />
    }
    const renderTreeNode = (comment: any) => {
        return (<TreeNode
            styles={{ treeClassName: classes.comments }}
            node={comment}
            fetchMore={handleFetchChildren}
            renderItem={renderComment}
            setReplyTo={setReplyTo}
            hasMore={hasMoreComments} />)
    }
    const hasMoreComments = (data: any) => !!data?.comments?.length;

    return (
        <div className={classes.container}>
            <div className={classes.back_button_container}>
                <Button className={classes.back_button} handleClick={() => navigate(-1)}>{'<'}</Button>
            </div>
            {loading && <Spinner label="loading..." />}
            {!loading && comments?.length && <InfiniteScroll
                initialHasMore={hasMore}
                renderItem={renderTreeNode}
                initialData={comments}
                fetchMore={handleCommentFetch} />}
            <div className={classes.footer}>
                <Input handleChange={handleCommentContentChange}
                    type={'text'}
                    name={'comment'}
                    className={classes.comment_thread_input}
                    required={true}
                    placeholder={replyTo?.data?.user?.email ? `reply to ` + replyTo?.data?.user?.email : 'write a comment...'}
                    value={commentContent}
                />
                <Button className={classes.comment_thread_input_button} disabled={!commentContent} handleClick={handleCommentSave}>
                    Save
                </Button>
            </div>
        </div>
    );
}

export default CommentsThread;