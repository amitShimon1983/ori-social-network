import { FunctionComponent, useCallback, useEffect, useRef, useState } from "react";
import { cameraService } from "../../services";
import { Button, VideoElement } from "../shared";
import classes from "./CameraRoll.module.css";

interface VideoProps {

}

const CameraRoll: FunctionComponent<VideoProps> = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const photoRef = useRef<any>(null);
    const [hasPhoto, setHasPhoto] = useState<boolean>(false)

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
    const handleSaveImage = () => { cameraService.saveImage(videoRef.current, photoRef.current, () => setHasPhoto(true)) }
    const handleClearImage = () => { cameraService.clearImage(photoRef.current, () => setHasPhoto(false)) }
    return (
        <div className={classes.camera}>
            <VideoElement className={classes.video} ref={videoRef}>
            </VideoElement>
            <div className={classes.buttons_panel}>
                <Button handleClick={handleSaveImage}>SNAP!</Button>
            </div>
            <div className={`${classes.results} ${hasPhoto && classes.hasPhoto}`}>
                <canvas ref={photoRef}></canvas>
                <Button handleClick={handleClearImage}>Close</Button>
            </div>
        </div>
    );
}

export default CameraRoll;