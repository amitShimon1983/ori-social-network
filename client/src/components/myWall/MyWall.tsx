import { FunctionComponent } from "react";
import { appContextVar } from "../../services/store";
import Wall from "../shared/wall/Wall";
interface MyWallProps {

}

const MyWall: FunctionComponent<MyWallProps> = () => {
    const { user } = appContextVar();
    return (<Wall user={user} />);
}

export default MyWall;