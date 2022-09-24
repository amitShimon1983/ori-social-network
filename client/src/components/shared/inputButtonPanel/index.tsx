import { FunctionComponent } from "react";
import { Button, FaMicrophoneAlt, IconButton, TbSend } from "..";
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
        <Input handleChange={handleChange}
        
            type={'text'}
            variant={'outlined'}
            name={'panel'}
            styles={{ root: classes.input_root }}
            required={true}
            placeholder={placeholder}
            value={inputValue} />
        <IconButton disabled={disabled} onClick={disabled ? undefined : handleSave} className={classes.button} color="info" aria-label="upload picture" component="label">
            {disabled ? <FaMicrophoneAlt /> : <TbSend />}
        </IconButton>
    </div>;
}
export default InputButtonPanel;