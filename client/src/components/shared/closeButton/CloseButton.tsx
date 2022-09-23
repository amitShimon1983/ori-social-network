import { FunctionComponent } from "react";
import { AiOutlineClose } from "../icons";
import classes from './CloseButton.module.css';
interface CloseButtonProps {
    onClick: (e: any) => void | Promise<void>;
    className?: string;
}

const CloseButton: FunctionComponent<CloseButtonProps> = ({ onClick, className }) => {
    return (<AiOutlineClose className={`${classes.icon} ${className}`} onClick={onClick} />);
}

export default CloseButton;