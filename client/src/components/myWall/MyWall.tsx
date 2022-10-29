import { FunctionComponent } from "react";
import { useGetUser } from "../../hooks";
import { appContextVar } from "../../services/store";
import { Spinner } from "../shared";
import Wall from "../shared/wall/Wall";
interface MyWallProps {

}
const MyWall: FunctionComponent<MyWallProps> = () => {
  const { user } = appContextVar();
  const { data, loading } = useGetUser(user._id);
  return (<>
    {!loading && <Wall user={data?.getUser} />}
    {loading && <Spinner label="Loading" />}
  </>);
}

export default MyWall;