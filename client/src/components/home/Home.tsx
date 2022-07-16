import { FunctionComponent } from "react";
import classes from './Home.module.css';
import { Post } from "../post";

interface HomeProps {

}

const Home: FunctionComponent<HomeProps> = () => {
  return (
    <div className={classes.container}>
      <Post />
    </div>
  );
}

export default Home;