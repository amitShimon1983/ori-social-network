import { FunctionComponent } from "react";
import classes from './Home.module.css';
import PostList from "../../post/PostList";

interface HomeProps {

}

const Home: FunctionComponent<HomeProps> = () => {
  return (<>
    <div className={classes.container}>
      <PostList />
    </div>
  </>
  );
}

export default Home;