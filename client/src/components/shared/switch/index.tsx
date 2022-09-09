import { FormControlLabel, Switch as SwitchMUI } from "@mui/material";
import { FunctionComponent } from "react";
interface SwitchProps {
    className: string;
    isTrue: boolean;
    handleChange: (event: any) => void
}

const Switch: FunctionComponent<SwitchProps> = ({ isTrue, handleChange, className }) => {
    return (<FormControlLabel
        className={className}
        control={<SwitchMUI sx={{ m: 1 }} />}
        label=""
        checked={isTrue}
        onChange={handleChange} />);
}

export default Switch;