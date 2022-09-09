
import { FunctionComponent } from "react";
import { BiImage, FiVideo, FiVideoOff, Switch } from "../shared";
import CameraButtonsList from "./VideoButtonsList";
import classes from "./CameraRoll.module.css";
interface CameraRollPanelProps {
    displayVideo: boolean,
    handleSwitchChange: (event: any) => void,
    videoBlob: Blob | undefined,
    saveVideoHandler: () => void,
    handleClearImage: () => void,
    imageBlob: Blob | undefined,
    saveImageHandler: () => void,
    isRecording: boolean,
    handleStop: () => Promise<void>,
    handleStart: () => Promise<void>,
    takePictureHandler: () => Promise<void>;
    handleDeleteVideo: () => void;
}
const CameralRollPanel: FunctionComponent<CameraRollPanelProps> = ({
    displayVideo,
    handleSwitchChange,
    videoBlob,
    saveVideoHandler,
    handleClearImage,
    imageBlob,
    saveImageHandler,
    isRecording,
    handleStop,
    handleStart,
    takePictureHandler,
    handleDeleteVideo
}) => {
    return <div className={classes.buttons_panel}>
        <Switch
            className={classes.form_control_switch}
            isTrue={displayVideo}
            handleChange={handleSwitchChange} />
        {displayVideo && <CameraButtonsList
            blob={videoBlob}
            isRecording={isRecording}
            saveHandler={saveVideoHandler}
            mainButtonIcon={!isRecording ? <FiVideo /> : <FiVideoOff />}
            handleMainButtonClick={isRecording ? handleStop : handleStart}
            deleteHandler={handleDeleteVideo}
        />}
        {!displayVideo && <CameraButtonsList blob={imageBlob}
            isRecording={false}
            mainButtonIcon={<BiImage />}
            saveHandler={saveImageHandler}
            handleMainButtonClick={takePictureHandler}
            deleteHandler={handleClearImage} />}
    </div>;
}

export default CameralRollPanel;