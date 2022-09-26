import React, { FunctionComponent } from "react";
import { Hr } from "../../styles";
import classes from './index.module.css';
interface HeaderProps {
    label: React.ReactNode;
    children?: React.ReactNode;
    styles?: { container?: string; header?: string; }
}

const Header: FunctionComponent<HeaderProps> = ({ label, children, styles }) => {
    return (
        <>
            <div className={`${classes.container} ${styles?.container}`}>
                {children}
                <h2 className={`${classes.header} ${styles?.header}`}>{label}</h2>
            </div>
            <Hr />
        </>
    );
}

export default Header;