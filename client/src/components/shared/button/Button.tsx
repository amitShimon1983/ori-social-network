import { FunctionComponent } from "react";

interface ButtonProps {
    handleClick: ({ target }: { target: any }) => void;
    children: React.ReactNode;
    disabled?: boolean;
}

const Button: FunctionComponent<ButtonProps> = ({ handleClick, children, disabled }) => {
    return (<button disabled={disabled} onClick={handleClick}>{children}</button>);
}

export default Button;