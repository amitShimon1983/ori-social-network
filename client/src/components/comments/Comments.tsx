import { FunctionComponent } from "react";
import { useNavigate, useParams } from "react-router";
import { useGetPostComments } from "../../hooks";
import { Button, Spinner, Tree } from "../shared";

interface CommentsThreadProps {

}

const CommentsThread: FunctionComponent<CommentsThreadProps> = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const { data, error, loading, fetchMore } = useGetPostComments(postId || '');
    console.log({ postId, data, error });
    return (<>
        <Button handleClick={() => navigate(-1)}>Back</Button>
        {loading && <Spinner label="loading..." />}
        <Tree data={[]} />
    </>);
}

export default CommentsThread;