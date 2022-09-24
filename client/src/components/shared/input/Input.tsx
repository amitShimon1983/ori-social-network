import { TextField } from "@mui/material";
import { FunctionComponent } from "react";

interface InputProps {
    handleChange: ({ target }: { target: any }) => void;
    type?: string;
    name?: string;
    styles?: { input?: string; root?: string; notchedOutline?: string };
    required?: boolean;
    placeholder?: string;
    label?: string;
    value: any;
    variant?: "standard" | "filled" | "outlined";

}

const Input: FunctionComponent<InputProps> = ({ handleChange, type, name, required, placeholder, value, styles, variant, label }) => {
    return (<>
        <TextField
            type={type}
            value={value}
            name={name}
            required={required}
            label={label}
            placeholder={placeholder}
            classes={styles}
            inputProps={{ onChange: handleChange, placeholder }}
            variant={variant || 'standard'} />
    </>
    );
}

export default Input;