import React, { FunctionComponent, useRef } from "react";
import { Button, VideoElement } from "../shared";
import classes from "./Video.module.css";

interface VideoProps {

}

const Video: FunctionComponent<VideoProps> = () => {
    const ref = useRef<HTMLVideoElement>(null);
    return (<div className={classes.camera}>
        <VideoElement ref={ref} video={{}} className={''} >
            <Button handleClick={() => { }}>SNAP!</Button>
        </VideoElement>
    </div>);
}

export default Video;