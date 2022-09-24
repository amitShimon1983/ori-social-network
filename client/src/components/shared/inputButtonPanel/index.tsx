import { FunctionComponent } from "react";
import { AiOutlineCamera, FaMicrophoneAlt, IconButton, TbSend } from "..";
import { MicrophoneRecorder } from "../../microphone";
import Input from "../input/Input";
import classes from './index.module.css';
interface InputButtonProps {
    handleChange: (event: any) => Promise<void> | void;
    placeholder: string;
    inputValue: string;
    handleSave: (event: any) => Promise<void> | void;
    disabled: boolean
}
const InputButtonPanel: FunctionComponent<InputButtonProps> = ({ handleChange, placeholder, inputValue, handleSave, disabled }) => {
    return <div className={classes.container}>
        <IconButton onClick={(e: any) => {
            console.log('uploading')
        }} className={classes.button} color="info" aria-label="upload picture" component="label">
            <AiOutlineCamera />
        </IconButton>
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
        </IconButton> : <MicrophoneRecorder />}
    </div>;
}
export default InputButtonPanel;