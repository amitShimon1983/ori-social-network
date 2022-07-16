import { FunctionComponent } from "react";
import { Video } from "../../screens";
import videoBj from '../../assets/videoBj.mp4';
interface PostProps {

}

const Post: FunctionComponent<PostProps> = () => {
    return (<div style={{ overflow: 'scroll', width: '100%', height: '100%' }}>
        <Video type={'video/mp4'} link={videoBj} />
        <Video type={'video/mp4'} link={videoBj} />
        <Video type={'video/mp4'} link={videoBj} />
        <Video type={'video/mp4'} link={videoBj} />
        <Video type={'video/mp4'} link={videoBj} />
        <Video type={'video/mp4'} link={videoBj} />
    </div>);
}

export default Post;