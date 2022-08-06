import { FunctionComponent, useCallback, useEffect, useRef, useState } from "react";
import { appConfig } from "../../configuration";
import { cameraService, Recorder } from "../../services";
import { Button, RecordingIcon, VideoElement } from "../shared";
import classes from "./CameraRoll.module.css";

interface VideoProps {
    onSave?: (blob: Blob) => void
}

const CameraRoll: FunctionComponent<VideoProps> = ({ onSave }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const photoRef = useRef<any>(null);
    const [hasPhoto, setHasPhoto] = useState<boolean>(false);
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [recorder, serRecorder] = useState<Recorder>();
    const [stream, setStream] = useState<MediaStream>()
    const [videoBlob, setVideoBlob] = useState<Blob>();
    const [imageBlob, setImageBlob] = useState<Blob>();

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
        cameraService.saveImage(videoRef.current, photoRef.current, (image) => {
            setImageBlob(image)
            setHasPhoto(true)
        })
    }

    const handleClearImage = () => {
        cameraService.clearImage(photoRef.current, () => {
            setImageBlob(undefined)
            setHasPhoto(false)
        })
    }

    const handleStop = async () => {
        if (recorder) {
            cameraService.stopRecording(recorder);
            setIsRecording(false);
        }
    }

    const handleStart = async () => {
        setVideoBlob(undefined)
        if (stream) {
            const recorderRef = await cameraService.startRecording(stream, undefined, setVideoBlob);
            setIsRecording(true)
            serRecorder(recorderRef)
        }
    }

    const handleSave = async (blobToSave: Blob) => {
        if (typeof onSave === 'function') {
            onSave(blobToSave)
        } else {
            const url = `${appConfig.serverUrl}${appConfig.uploadEndpoint}`;
            await cameraService.saveFile(url, blobToSave);
        }
    }

    return (
        <div className={classes.camera}>
            <VideoElement className={classes.video} video={{ controls: true, muted: true }} ref={videoRef}>
            </VideoElement>
            <div className={classes.buttons_panel}>
                <Button handleClick={handleSaveImage}>SNAP!</Button>
            </div>
            {isRecording && <RecordingIcon>Recording... </RecordingIcon>}
            {isRecording && <Button handleClick={handleStop}>stop recording...</Button>}
            {!!videoBlob && <Button handleClick={() => handleSave(videoBlob)}>save video</Button>}
            {!!imageBlob && <Button handleClick={() => handleSave(imageBlob)}>save Image</Button>}
            {!isRecording && <Button handleClick={handleStart}>start recording...</Button>}
            <div className={`${classes.picture} ${hasPhoto && classes.hasPhoto}`}>
                <canvas ref={photoRef}></canvas>
                <Button handleClick={handleClearImage}>Close</Button>
            </div>
        </div>
    );
}

export default CameraRoll;