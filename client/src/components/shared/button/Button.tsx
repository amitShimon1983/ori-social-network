import Button from '@mui/material/Button';
import { FunctionComponent } from "react";

export interface ButtonProps {
    handleClick: ({ target }: { target: any }) => void;
    children: React.ReactNode;
    disabled?: boolean;
    className?: string;
    variant?: 'contained' | 'text' | 'outlined';
}

const ButtonMUI: FunctionComponent<ButtonProps> = ({ handleClick, children, disabled, className, variant }) => {
    return (<Button variant={variant || 'contained'} className={className} disabled={disabled} onClick={(e) => { e.stopPropagation(); handleClick(e); }}>{children}</Button>);
}

export default ButtonMUI;