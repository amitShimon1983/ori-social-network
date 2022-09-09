import { Fab } from "@mui/material";
import { FunctionComponent } from "react";
import { RecordingIcon, RiDeleteBin2Fill, BsSave, } from "../shared";
import classes from "./CameraRoll.module.css";

interface VideoButtonsListProps {
    blob: Blob | undefined;
    isRecording: boolean;
    saveHandler: () => void;
    handleMainButtonClick: () => Promise<void>;
    deleteHandler: () => void;
    mainButtonIcon: React.ReactNode;
}
const CameraButtonsList: FunctionComponent<VideoButtonsListProps> = ({ blob,
    isRecording,
    saveHandler,
    handleMainButtonClick,
    deleteHandler,
    mainButtonIcon
}) => {
    return <div className={`${classes.video_buttons_container} ${!!blob && classes.video_buttons_container_finish_recording} ${isRecording && classes.video_buttons_container_start_recording}`}>
        {!!blob &&
            <Fab size="small" className={classes.button} onClick={saveHandler}><BsSave />
            </Fab>}
        {<Fab className={`${classes.button}`} onClick={handleMainButtonClick} color="error" aria-label="recording">
            {mainButtonIcon}
        </Fab>}
        {isRecording && <div className={classes.recording_icon}><RecordingIcon></RecordingIcon></div>}
        {!!blob &&
            <Fab size="small" className={classes.button} onClick={deleteHandler}><RiDeleteBin2Fill />
            </Fab>}
    </div>;
}
export default CameraButtonsList;