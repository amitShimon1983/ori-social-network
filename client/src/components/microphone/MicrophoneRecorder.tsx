import { IconButton } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { FaMicrophoneAlt, FaMicrophoneAltSlash, AiOutlineCloudUpload, FcCancel, BsStopCircle } from "..";
import { appConfig } from "../../configuration";
import { cameraService, Recorder } from "../../services";
import classes from './MicrophoneRecorder.module.css';
interface MicrophoneRecorderProps {
    onSave?: () => Promise<any> | any
}

const MicrophoneRecorder: FunctionComponent<MicrophoneRecorderProps> = ({ onSave }) => {
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [recorder, setRecorder] = useState<Recorder>();
    const [blob, setBlob] = useState<Blob>();
    const handleStop = async () => {
        if (recorder) {
            cameraService.stopRecording(recorder);
            setIsRecording(false);
        }
    }

    const handleStart = async () => {
        setBlob(undefined);
        const userStream = await cameraService.getCameraStream({ audio: true });
        if (userStream) {
            const recorderRef = await cameraService.startRecording(userStream, undefined, setBlob, 'audio/webm', {
                mimeType: 'audio/webm'
            });
            setRecorder(recorderRef)
        }
    }

    const handleSave = async () => {
        const url = `${appConfig.serverUrl}${appConfig.uploadMessageEndpoint}`;
        console.log(blob);
        if (typeof onSave === 'function') {
            const payload = await onSave();
            await cameraService.saveFile(url, blob, undefined, undefined, { ...payload, type: 'audio' });
            setIsRecording(false);
            setBlob(undefined);
        }
    }

    const deleteHandler = () => {
        setIsRecording(false);
        setBlob(undefined);
    }

    return (
        <div className={`${classes.container} ${(isRecording || !!blob) && classes.container_absolute}`}>
            <IconButton onClick={isRecording ? handleStop : async () => {
                setIsRecording(true);
                await handleStart()
            }} color="info" aria-label="record message" component="label">
                {isRecording ? <FaMicrophoneAltSlash /> : <FaMicrophoneAlt />}
            </IconButton>
            {blob && <div onClick={handleSave}><AiOutlineCloudUpload /></div>}
            {isRecording && <div onClick={handleStop}><BsStopCircle /></div>}
            {blob && <div onClick={deleteHandler}><FcCancel /></div>}
        </div >
    );
}

export default MicrophoneRecorder;



