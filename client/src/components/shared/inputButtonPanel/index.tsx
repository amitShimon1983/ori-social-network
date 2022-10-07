import { FunctionComponent } from "react";
import { AiOutlineCamera, FiCameraOff, IconButton, TbSend } from "..";
import { MicrophoneRecorder } from "../../microphone";
import Input from "../input/Input";
import classes from './index.module.css';
interface InputButtonProps {
    handleChange: (event: any) => Promise<void> | void;
    placeholder: string;
    inputValue: string;
    handleSave: (event: any) => Promise<void> | void;
    disabled: boolean;
    isCameraOpen?: boolean;
    handleRecorderSave?: (blob: Blob, type: string) => void | Promise<void>;
    toggleCamera?: () => Promise<void> | void;
}
const InputButtonPanel: FunctionComponent<InputButtonProps> = ({ isCameraOpen, toggleCamera, handleChange, placeholder, inputValue, handleSave, disabled, handleRecorderSave }) => {
    return <div className={classes.container}>
        {toggleCamera && <IconButton onClick={toggleCamera} className={classes.button} color="info" aria-label="upload picture" component="label">
            {!isCameraOpen ? <AiOutlineCamera /> : <FiCameraOff />}
        </IconButton>}
        <Input handleChange={handleChange}
            type={'text'}
            variant={'outlined'}
            name={'panel'}
            styles={{ root: classes.input_root }}
            required={true}
            placeholder={placeholder}
            value={inputValue} />


        {!disabled ? <IconButton onClick={disabled ? (e: any) => {
            console.log('recording')
        }
            : handleSave} className={`${classes.button}`} color="info" aria-label="record message" component="label">
            <TbSend />
        </IconButton> : <MicrophoneRecorder onSave={handleRecorderSave} />}
    </div>;
}
export default InputButtonPanel;