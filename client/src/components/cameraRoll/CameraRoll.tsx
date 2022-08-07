import { FunctionComponent, useCallback, useEffect, useRef, useState } from "react";
import { appConfig } from "../../configuration";
import { cameraService, Recorder } from "../../services";
import { BiVideoRecording, Button, RecordingIcon, VideoElement } from "../shared";
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
        const userStream = await cameraService.getCameraStream({
            video: { width: 500, height: 1080 }, audio: {
                autoGainControl: false,
                echoCancellation: false,
                noiseSuppression: false
            }
        }, handleStream);
        if (userStream) {
            setStream(userStream)
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
    const saveVideoHandler = () => {
        if (videoBlob) {
            handleSave(videoBlob);
            setVideoBlob(undefined);
        }
    }
    const saveImageHandler = () => {
        if (imageBlob) {
            handleSave(imageBlob);
            setImageBlob(undefined)
        }
    }
    return (
        <div className={classes.camera}>
            <VideoElement className={classes.video} video={{ controls: true, muted: true }} ref={videoRef}>
            </VideoElement>
            {isRecording && <div className={classes.recording_icon}><RecordingIcon></RecordingIcon></div>}
            <div className={classes.buttons_panel}>
                <Button className={classes.button} handleClick={handleSaveImage}>Task a picture</Button>
                {isRecording && <Button className={`${classes.button} ${classes.button_recording}`} handleClick={handleStop}><BiVideoRecording /></Button>}
                {!!videoBlob && <Button className={classes.button} handleClick={saveVideoHandler}>save video</Button>}
                {!!imageBlob && <Button className={classes.button} handleClick={saveImageHandler}>save Image</Button>}
                {!isRecording && <Button className={`${classes.button} ${classes.button_recording}`} handleClick={handleStart}><BiVideoRecording /></Button>}
            </div>
            {/* <div className={`${classes.picture} ${hasPhoto && classes.hasPhoto}`}>
                <canvas ref={photoRef}></canvas>
                <Button handleClick={handleClearImage}>Clear</Button>
            </div> */}
        </div>
    );
}

export default CameraRoll;