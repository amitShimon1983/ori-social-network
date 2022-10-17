import { FunctionComponent, useCallback, useEffect, useRef, useState } from "react";
import { appConfig } from "../../configuration";
import { cameraService, Recorder } from "../../services";
import { Spinner, VideoElement } from "../shared";
import classes from "./CameraRoll.module.css";
import CameralRollPanel from "./CameraRollPanel";

interface VideoProps {
    onSave?: (blob: Blob, type?: string) => void;
    styles?: { video?: string; camera?: string; picture?: string; hasPhoto?: string; canvas?: string };
}
const deviceMediaOptions = {
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
}
const CameraRoll: FunctionComponent<VideoProps> = ({ onSave, styles }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const photoRef = useRef<any>(null);
    const [hasPhoto, setHasPhoto] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [displayVideo, setDisplayVideo] = useState<boolean>(true);
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [recorder, setRecorder] = useState<Recorder>();
    const [stream, setStream] = useState<MediaStream>()
    const [videoBlob, setVideoBlob] = useState<Blob>();
    const [imageBlob, setImageBlob] = useState<Blob>();

    const getUserVideo = useCallback(async () => {
        const userStream = await cameraService.getCameraStream(deviceMediaOptions);
        if (userStream) {
            const video: any = videoRef.current;
            if (video) {
                video.srcObject = userStream;
                video.play();
            }
            setStream(userStream)
            setLoading(false)
        }
    }, [setLoading]);

    useEffect(() => {
        if (!stream) { getUserVideo(); }
        return () => {
            if (stream) { cameraService.closeCamera(stream); }
        }
    }, [videoRef, getUserVideo, hasPhoto, stream])
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
            const recorderRef = await cameraService.startRecording(stream, undefined, setVideoBlob, 'video/webm', {
                audioBitsPerSecond: 128000,
                videoBitsPerSecond: 2500000,
                mimeType: 'video/webm'
            });
            setIsRecording(true)
            setRecorder(recorderRef)
        }
    }

    const handleSave = async (blobToSave: Blob, type: string) => {
        if (typeof onSave === 'function') {
            onSave(blobToSave, type)
        } else {
            const url = `${appConfig.serverUrl}${appConfig.uploadPostEndpoint}`;
            await cameraService.saveFile(url, blobToSave);
            setStream(undefined)
        }
    }

    const saveVideoHandler = () => {
        if (videoBlob) {
            handleSave(videoBlob, 'video');
            setVideoBlob(undefined);
        }
    }

    const saveImageHandler = () => {
        if (imageBlob) {
            handleSave(imageBlob, 'image');
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
        <div className={`${classes.camera} ${styles?.camera}`}>
            {loading && <Spinner />}
            {!hasPhoto && <VideoElement className={`${styles?.video} ${classes.video} ${loading && classes.video_loading}`} video={{ controls: false, muted: true, }} ref={videoRef}>
            </VideoElement>}
            <div className={`${classes.picture} ${styles?.picture} ${hasPhoto && classes.hasPhoto}`}>
                <canvas className={`${classes.canvas} ${styles?.canvas}`} ref={photoRef}></canvas>
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