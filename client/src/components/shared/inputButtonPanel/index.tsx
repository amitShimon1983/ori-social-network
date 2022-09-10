import { FunctionComponent } from "react";
import { Button } from "..";
import Input from "../input/Input";
import classes from './index.module.css';
interface InputButtonProps {
    handleChange: (event: any) => void;
    placeholder: string;
    inputValue: string;
    handleSave: (event: any) => Promise<void>
}
const InputButtonPanel: FunctionComponent<InputButtonProps> = ({ handleChange, placeholder, inputValue, handleSave }) => {
    return <div className={classes.container}>
        <Input handleChange={handleChange}
            type={'text'}
            name={'comment'}
            className={classes.input}
            required={true}
            placeholder={placeholder}
            value={inputValue} />
        <Button variant="text" className={classes.button} disabled={!inputValue} handleClick={handleSave}>
            Save
        </Button>
    </div>;
}
export default InputButtonPanel;