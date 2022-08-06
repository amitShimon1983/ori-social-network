import { FunctionComponent } from "react";
import classes from './Home.module.css';
import { CameraRoll } from "../cameraRoll";
import MyWall from "../myWall/MyWall";

interface HomeProps {

}

const Home: FunctionComponent<HomeProps> = () => {
  return (<>
    {/* <CameraRoll /> */}
    <div className={classes.container}>
      {/* <PostList /> */}
      <MyWall/>
    </div>
  </>
  );
}

export default Home;