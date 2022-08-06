import { FunctionComponent } from "react";

interface ButtonProps {
    handleClick: ({ target }: { target: any }) => void;
    children: React.ReactNode;
    disabled?: boolean;
    className?: string;
}

const Button: FunctionComponent<ButtonProps> = ({ handleClick, children, disabled, className }) => {
    return (<button className={className} disabled={disabled} onClick={handleClick}>{children}</button>);
}

export default Button;