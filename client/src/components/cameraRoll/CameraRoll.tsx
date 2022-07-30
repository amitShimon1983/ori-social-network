import { FunctionComponent, useCallback, useEffect, useRef, useState } from "react";
import { cameraService, Recorder } from "../../services";
import { Button, VideoElement } from "../shared";
import classes from "./CameraRoll.module.css";

interface VideoProps {

}

const CameraRoll: FunctionComponent<VideoProps> = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const photoRef = useRef<any>(null);
    const [hasPhoto, setHasPhoto] = useState<boolean>(false);
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [recorder, serRecorder] = useState<Recorder>();
    const [stream, setStream] = useState<MediaStream>()

    const handleStream = useCallback(async (stream: MediaStream) => {
        const video: any = videoRef.current;
        if (video) {
            video.srcObject = stream;
            video.play();
        }
    }, [videoRef])

    const getUserVideo = useCallback(async () => {
        const strm = await cameraService.getCameraStream({
            video: { width: 1920, height: 1080 }, audio: true
        }, handleStream);
        if (strm) {
            setStream(strm)
        }
    }, [handleStream]);

    useEffect(() => {
        getUserVideo()
        return () => {
        }
    }, [videoRef, getUserVideo])
    const handleSaveImage = () => {
        cameraService.saveImage(videoRef.current, photoRef.current, () => setHasPhoto(true))
    }
    const handleClearImage = () => { cameraService.clearImage(photoRef.current, () => setHasPhoto(false)) }
    const handleStop = async () => {
        if (recorder) {
            cameraService.stopRecording(recorder);
            setIsRecording(false)
        }
    }
    const handleStart = async () => {
        if (stream) {
            const r = await cameraService.startRecording(stream);
            setIsRecording(true)
            serRecorder(r)
        }
    }
    return (
        <div className={classes.camera}>
            <VideoElement className={classes.video} video={{ controls: true, muted: isRecording }} ref={videoRef}>
            </VideoElement>
            <div className={classes.buttons_panel}>
                <Button handleClick={handleSaveImage}>SNAP!</Button>
            </div>
            <div className={`${classes.picture} ${hasPhoto && classes.hasPhoto}`}>
                <canvas ref={photoRef}></canvas>
                <Button handleClick={handleClearImage}>Close</Button>
            </div>
            {isRecording && <Button handleClick={handleStop}>stop recording...</Button>}
            {!isRecording && <Button handleClick={handleStart}>start recording...</Button>}
        </div>
    );
}

export default CameraRoll;