import { FunctionComponent } from "react";
import classes from './Home.module.css';
import PostList from "../../post/PostList";
import { Spinner } from "../loader";
import { useGetRandomPosts } from "../../../hooks";

interface HomeProps {

}

const Home: FunctionComponent<HomeProps> = () => {
  const { data, error, loading } = useGetRandomPosts()
  return (<>
    <div className={classes.container}>
      {!loading &&
        <PostList
          displayToolbar={true}
          posts={data?.getRandomPosts.posts}
          styles={{
            postContainerClassName: classes.post_container__home,
            footerStyles: {
              containerClassName: classes.post_footer_container__home,
              iconContainerClassName: classes.post_footer_icon_container__home,
              iconInnerContainerClassName: classes.icon_inner_container__home
            }
          }} />}
      {loading && <Spinner label="Loading" />}
      {error && <div>{error?.message}</div>}
    </div>
  </>
  );
}

export default Home;