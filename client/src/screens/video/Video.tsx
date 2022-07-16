import { FunctionComponent } from "react";
import classes from './Video.module.css';
interface VideoProps {
    type: string;
    link: string;
}

const Video: FunctionComponent<VideoProps> = ({ type, link }) => {
    return (<div className={classes.container}>
        <video className={classes.video} controls width="100%" height="100%" muted autoPlay={true}>
            <source src={link} type={type} />
        </video>
    </div>);
}

export default Video;