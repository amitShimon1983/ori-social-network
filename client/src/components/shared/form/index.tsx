import { FunctionComponent, ReactNode } from "react";
import classes from './Form.module.css';
interface FormProps {
    children?: ReactNode;
    className?: string;
}

const Form: FunctionComponent<FormProps> = ({ children, className }) => {
    return (<form className={`${classes.container} ${className}`}>
        {children}
    </form>);
}

export default Form;