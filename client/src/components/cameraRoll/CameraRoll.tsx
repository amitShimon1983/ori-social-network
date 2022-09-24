import { FunctionComponent, useCallback, useEffect, useRef, useState } from "react";
import { appConfig } from "../../configuration";
import { cameraService, Recorder } from "../../services";
import { VideoElement } from "../shared";
import classes from "./CameraRoll.module.css";
import CameralRollPanel from "./CameraRollPanel";

interface VideoProps {
    onSave?: (blob: Blob) => void
}

const CameraRoll: FunctionComponent<VideoProps> = ({ onSave }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const photoRef = useRef<any>(null);
    const [hasPhoto, setHasPhoto] = useState<boolean>(false);
    const [displayVideo, setDisplayVideo] = useState<boolean>(true);
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [recorder, setRecorder] = useState<Recorder>();
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
            video: {
                width: {
                    min: 500,
                    ideal: 500,
                    max: 560,
                },
                height: {
                    min: 720,
                    ideal: 1080,
                    max: 1440
                }
            }, audio: true
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

    const takePictureHandler = async () => {
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
            setRecorder(recorderRef)
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
            setImageBlob(undefined);
            setHasPhoto(false);
        }
    }

    const handleSwitchChange = (event: any) => {
        setVideoBlob(undefined);
        setImageBlob(undefined);
        setHasPhoto(false);
        setDisplayVideo(prev => !prev)
    }

    const handleDeleteVideo = () => {
        setVideoBlob(undefined);
    }

    return (
        <div className={classes.camera}>
            {!hasPhoto && <VideoElement className={classes.video} video={{ controls: false, muted: true, }} ref={videoRef}>
            </VideoElement>}
            <div className={`${classes.picture} ${hasPhoto && classes.hasPhoto}`}>
                <canvas className={`${classes.canvas}`} ref={photoRef}></canvas>
            </div>
            <CameralRollPanel
                displayVideo={displayVideo}
                handleSwitchChange={handleSwitchChange}
                videoBlob={videoBlob}
                saveVideoHandler={saveVideoHandler}
                handleClearImage={handleClearImage}
                imageBlob={imageBlob}
                saveImageHandler={saveImageHandler}
                isRecording={isRecording}
                handleStop={handleStop}
                handleStart={handleStart}
                takePictureHandler={takePictureHandler}
                handleDeleteVideo={handleDeleteVideo}
            />
        </div>
    );
}

export default CameraRoll;



