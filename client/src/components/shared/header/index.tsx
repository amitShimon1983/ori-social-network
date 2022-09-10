import React, { FunctionComponent } from "react";
import { Hr } from "../../styles";
import classes from './index.module.css';
interface HeaderProps {
    label: string;
    children?: React.ReactNode;
}

const Header: FunctionComponent<HeaderProps> = ({ label, children }) => {
    return (
        <>
            <div className={classes.container}>
                {children}
                <h2 className={classes.header}>{label}</h2>
            </div>
            <Hr />
        </>
    );
}

export default Header;