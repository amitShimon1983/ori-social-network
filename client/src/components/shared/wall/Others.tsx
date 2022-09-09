import { FunctionComponent } from "react";
import { useParams } from "react-router";
import { useGetUser } from "../../../hooks";
import { Spinner } from "../loader";
import Wall from "./Wall";

interface OthersProps {

}

const Others: FunctionComponent<OthersProps> = () => {
    const { userId } = useParams();
    const { data, loading } = useGetUser(userId);

    return (<>
        {!loading && <Wall user={data.getUser} />}
        {loading && <Spinner label="loading" />}
    </>);
}

export default Others;