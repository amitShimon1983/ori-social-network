import { FunctionComponent } from "react";
import Me from "../me";
import PostList from "../post/PostList";
import classes from './MyWall.module.css';
interface MyWallProps {

}

const MyWall: FunctionComponent<MyWallProps> = () => {
    return (<>
        <Me />
        <div className={classes.container}>
            <PostList postClassName={classes.post} />
        </div>
    </>
    );
}

export default MyWall;