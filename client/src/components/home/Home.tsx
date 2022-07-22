import { FunctionComponent } from "react";
import classes from './Home.module.css';
import { Post } from "../post";
import { CameraRoll } from "../cameraRoll";

interface HomeProps {

}

const Home: FunctionComponent<HomeProps> = () => {
  return (
    <div className={classes.container}>
      {/* <CameraRoll /> */}
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
}

export default Home;