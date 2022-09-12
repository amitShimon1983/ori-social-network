import { FunctionComponent, useState } from "react";
import { useParams } from "react-router";
import { useCommentPost, useGetPostComments } from "../../hooks";
import { BackButton } from "../backButton";
import { Header, InputButtonPanel, Spinner } from "../shared";
import Card from "../shared/card/Card";
import InfiniteScroll from "../shared/infiniteScrolling/InfiniteScroll";
import { TreeNode } from "../shared/tree/Tree";
import classes from './CommentsThread.module.css';
interface CommentsThreadProps {

}
const limit = 20;
const CommentsThread: FunctionComponent<CommentsThreadProps> = () => {
    const { postId } = useParams();
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
        const { data: fetchData } = await getLazyComment({
            variables: {
                postId: postId!,
                commentId: data?._id.toString(),
                skip,
                limit
            },
        })

        return fetchData?.getComments?.comments || []
    }
    const renderComment = (data: any) => {
        return <Card
            navigateOnClick={true}
            displayButtons={true}
            key={data._id}
            _id={data._id}
            content={data.content}
            user={data.user}
            createdAt={data.createdAt} />
    }
    const renderTreeNode = (comment: any) => {
        return (<TreeNode
            key={'treeNode' + comment._id}
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
            <Header label={'Comments'} ><BackButton /></Header>
            {loading && <Spinner label="Loading" />}
            {!loading && comments?.length && <InfiniteScroll
                initialHasMore={hasMore}
                renderItem={renderTreeNode}
                initialData={comments}
                fetchMore={handleCommentFetch} />}
            <InputButtonPanel
                disabled={!commentContent}
                handleChange={handleCommentContentChange}
                inputValue={commentContent}
                handleSave={handleCommentSave}
                placeholder={replyTo?.data?.user?.email ? `reply to ` + replyTo?.data?.user?.email : 'write a comment...'} />
        </div>
    );
}

export default CommentsThread;
