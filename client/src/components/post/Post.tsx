import { FunctionComponent } from "react";
import { Video } from "../../screens";
import videoBj from '../../assets/videoBj.mp4';
interface PostProps {

}

const Post: FunctionComponent<PostProps> = () => {
    return (<>
        <h1>Post</h1>
        <Video type={'video/mp4'} link={videoBj} />
    </>);
}

export default Post;