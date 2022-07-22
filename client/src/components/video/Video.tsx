import { FunctionComponent, useRef, useState } from "react";
import { VideoElement } from "..";
import { cameraService } from "../../services";
import classes from './Video.module.css';
interface VideoProps {
    type: string;
    link: string;
}

const Video: FunctionComponent<VideoProps> = ({ type, link }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false)

    const toggleVideoPlayingState = () => {
        cameraService.handleVideoActiveState(videoRef.current, isPlaying);
        setIsPlaying((prev) => !prev)
    }

    return (
        <div className={classes.container}>
            <VideoElement ref={videoRef} className={classes.video} video={{
                onClick: toggleVideoPlayingState,
                width: "100%",
                height: "100%"
            }}>
                <source src={link} type={type} />
            </VideoElement>
        </div>
    );
}

export default Video;