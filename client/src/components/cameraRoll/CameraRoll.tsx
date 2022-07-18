import { FunctionComponent, useCallback, useEffect, useRef, useState } from "react";
import { cameraService } from "../../services";
import { Button, VideoElement } from "../shared";
import classes from "./CameraRoll.module.css";

interface VideoProps {

}

const CameraRoll: FunctionComponent<VideoProps> = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const photoRef = useRef<any>(null);
    const [hasPhoto, sethasPhoto] = useState<boolean>(false)

    const handleStream = useCallback(async (stream: MediaStream) => {
        let video = videoRef.current;
        if (video) { video.srcObject = stream; video.play(); }
    }, [videoRef])

    const getUserVideo = useCallback(async () => {
        await cameraService.getVideo({ video: { width: 1920, height: 1080 } }, handleStream);
    }, [handleStream]);

    useEffect(() => {
        getUserVideo()
        return () => {
        }
    }, [videoRef, getUserVideo])

    return (
        <div className={classes.camera}>
            <VideoElement ref={videoRef}>
                <Button handleClick={() => { }}>SNAP!</Button>
            </VideoElement>
            <div className={`${classes.results} ${hasPhoto && classes.hasPhoto}`}>
                <canvas ref={photoRef}></canvas>
                <Button handleClick={() => { }}>Close</Button>
            </div>
        </div>
    );
}

export default CameraRoll;