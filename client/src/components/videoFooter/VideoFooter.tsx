import { FunctionComponent } from "react";
import classes from './VideoFooter.module.css';
interface VideoFooterProps {

}

const VideoFooter: FunctionComponent<VideoFooterProps> = () => {
    return (<div className={classes.container}>
        Im a Footer
    </div>);
}

export default VideoFooter;