import React, { FunctionComponent } from "react";
import classes from './fadeDrawer.module.css';
interface FadeDrawerProps {
    styles?: { container: string };
    children?: React.ReactNode;
    display: boolean;
}

const FadeDrawer: FunctionComponent<FadeDrawerProps> = ({ styles, children, display }) => {
    return (<div className={`${styles?.container} ${display ? classes.fade_in : classes.fade_out}`}>
        {children}
    </div>);
}

export default FadeDrawer;