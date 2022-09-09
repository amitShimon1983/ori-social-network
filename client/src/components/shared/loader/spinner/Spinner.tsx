import { CircularProgress } from "@mui/material";
import { FunctionComponent } from "react";
import classes from './Spinner.module.css';
interface SpinnerProps {
    label?: string;
    styles?: { containerClassName: string; circularProgressClassName: string; labelClassName: string; }
    className?: string;
    color?: "primary" | "secondary" | "error" | "info" | "success" | "warning" | "inherit" | undefined;
}

const Spinner: FunctionComponent<SpinnerProps> = ({ label, color, styles }) => {
    return (<div className={`${classes.container} ${styles?.containerClassName}`}>
        <div className={`${classes.circular_progress} ${styles?.circularProgressClassName}`}>
            <CircularProgress color={color || 'primary'} title={label} />
        </div>
        <p className={`${classes.loading} ${styles?.labelClassName}`}>Loading
            <span className={classes.dots_cont}>
                <span className={`${classes.dot} ${classes.dot_1}`}></span>
                <span className={`${classes.dot} ${classes.dot_2}`}></span>
                <span className={`${classes.dot} ${classes.dot_3}`}></span>
            </span>
        </p>
    </div>);
}

export default Spinner;