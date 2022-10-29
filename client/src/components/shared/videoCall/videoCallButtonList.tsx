import { FunctionComponent } from "react";
import { AiOutlineAudio, AiOutlineAudioMuted, Fab, HiOutlinePhoneIncoming, MdOutlineVideocam, MdOutlineVideocamOff, TbPhoneOff } from "..";
import classes from './videoCall.module.css';
interface VideoCallButtonListProps {
    callStarted: boolean;
    callerSdp?: string;
    createAnswer: () => void
    endConversation: () => void
    toggleAudio: () => void
    toggleVideo: () => void
    playVideo: boolean
    playAudio: boolean
}
export const VideoCallButtonList: FunctionComponent<VideoCallButtonListProps> = ({ playAudio, playVideo, toggleVideo, toggleAudio, callStarted, callerSdp, createAnswer, endConversation }) => {
    return <div className={classes.buttons_container}>
        {!callStarted && callerSdp && <Fab
            color="success"
            size="small"
            className={` ${!callStarted && callerSdp && classes.fab_incoming}`}
            onClick={createAnswer}>
            <HiOutlinePhoneIncoming />
        </Fab>}
        <Fab
            size="small"
            color="error"
            className={` ${!callStarted && classes.fab_close}`}
            onClick={endConversation}>
            <TbPhoneOff />
        </Fab>
        {callStarted && <Fab
            color="primary"
            size="small"
            className={` ${!callStarted && classes.fab_incoming}`}
            onClick={toggleAudio}>
            {!playAudio ? <AiOutlineAudioMuted /> : <AiOutlineAudio />}
        </Fab>}
        {callStarted && <Fab
            color="primary"
            size="small"
            className={` ${!callStarted && classes.fab_close}`}
            onClick={toggleVideo}>
            {playVideo ? <MdOutlineVideocamOff /> : <MdOutlineVideocam />}
        </Fab>}
    </div>;
}
