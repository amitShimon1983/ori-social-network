import { FunctionComponent } from "react";
import { Video } from "../video";
import videoBj from '../../assets/videoBj.mp4';
import { VideoFooter } from "../videoFooter";
interface PostProps {

}

const Post: FunctionComponent<PostProps> = () => {
    return (<>
        <Video type={'video/mp4'} link={videoBj} />
        <VideoFooter />
    </>);
}

export default Post;