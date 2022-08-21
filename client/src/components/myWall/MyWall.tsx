import { FunctionComponent } from "react";
import { appContextVar } from "../../services/store";
import Me from "../me";
import PostList from "../post/PostList";
import classes from './MyWall.module.css';
interface MyWallProps {

}

const MyWall: FunctionComponent<MyWallProps> = () => {
    const { user } = appContextVar();
    return (<>
        <Me imageClass={classes.image} user={user} displayDetails={true} />
        <div className={classes.container}>
            <PostList postClassName={classes.post} />
        </div>
    </>
    );
}

export default MyWall;