import { TextField } from "@mui/material";
import { FunctionComponent } from "react";

interface InputProps {
    handleChange: ({ target }: { target: any }) => void;
    type?: string;
    name?: string;
    className?: string;
    required?: boolean;
    placeholder?: string;
    value: any;
    variant?: "standard" | "filled" | "outlined";

}

const Input: FunctionComponent<InputProps> = ({ handleChange, type, name, required, placeholder, value, className, variant }) => {
    return (<>
        <TextField type={type} className={className} value={value} name={name} required={required} label={placeholder} inputProps={{ onChange: handleChange }} variant={variant || 'standard'} />
        {/* <input className={className} value={value} placeholder={placeholder} type={type} name={name} required={required} onChange={handleChange} /> */}
    </>
    );
}

export default Input;