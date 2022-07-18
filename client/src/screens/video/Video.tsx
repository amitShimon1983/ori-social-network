import { FunctionComponent } from "react";
import { VideoElement } from "../../components";
import classes from './Video.module.css';
interface VideoProps {
    type: string;
    link: string;
}

const Video: FunctionComponent<VideoProps> = ({ type, link }) => {
    return (<div className={classes.container}>
        <VideoElement className={classes.video} video={{ controls: true, width: "100%", height: "100%", muted: true, autoPlay: true }}>
            <source src={link} type={type} />
        </VideoElement>
    </div>);
}

export default Video;