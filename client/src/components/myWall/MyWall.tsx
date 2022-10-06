import { gql, useQuery, useSubscription } from "@apollo/client";
import { FunctionComponent } from "react";
import { useGetUser } from "../../hooks";
import { appContextVar } from "../../services/store";
import { Spinner } from "../shared";
import Wall from "../shared/wall/Wall";
interface MyWallProps {

}
const TEST_ = gql`
subscription NewNotification {
  newNotification {
    message
    date
  }
}
`
const MyWall: FunctionComponent<MyWallProps> = () => {
  const { user } = appContextVar();
  const { data: subscription, error, } = useSubscription(TEST_);
  //  const { subscribeToMore} =useQuery(TEST_)
  const { data, loading } = useGetUser(user._id);
  console.log({ subscription, error });

  return (<>
    {/* {!loading && <Wall user={data?.getUser} />} */}
    {loading && <Spinner label="Loading" />}
  </>);
}

export default MyWall;