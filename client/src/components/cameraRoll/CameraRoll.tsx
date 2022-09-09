import { Fab } from "@mui/material";
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

            video: { width: 500, height: 2560 }, audio: true
        }, handleStream);
        if (userStream) {
            setStream(userStream)
        }
    }, [handleStream]);

    useEffect(() => {
        getUserVideo()
        return () => {
        }
    }, [videoRef, getUserVideo, hasPhoto])

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
            {!hasPhoto && <VideoElement className={classes.video} video={{ controls: false, muted: true, }} ref={videoRef}>
            </VideoElement>}
            {isRecording && <div className={classes.recording_icon}><RecordingIcon></RecordingIcon></div>}
            <div className={`${classes.picture} ${hasPhoto && classes.hasPhoto}`}>
                <canvas className={`${classes.canvas}`} ref={photoRef}></canvas>
            </div>
            <div className={classes.buttons_panel}>
                {!!videoBlob && !hasPhoto && <Button className={classes.button} handleClick={saveVideoHandler}>save video</Button>}
                {hasPhoto && <Button className={classes.button} handleClick={handleClearImage}>Clear</Button>}
                {!!imageBlob && <Button className={classes.button} handleClick={saveImageHandler}>save Image</Button>}
                {!hasPhoto && <Fab className={`${classes.button} ${classes.button_recording}`} onClick={isRecording ? handleStop : handleStart} color="error" aria-label="edit">
                    <BiVideoRecording />
                </Fab>}
                {!videoBlob && !hasPhoto && <Button className={classes.button} handleClick={handleSaveImage}>Take a picture</Button>}
            </div>
        </div>
    );
}

export default CameraRoll;