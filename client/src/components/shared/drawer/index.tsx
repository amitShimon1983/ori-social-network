import { FunctionComponent } from "react";
import { AiOutlineClose, CloseButton, Header } from "..";
import classes from './index.module.css';
interface DrawerProps {
    children: React.ReactNode;
    isOpen: boolean;
    dismissHandler: () => void | Promise<void>;
    label: React.ReactNode;
    headerStyles: { container?: string; header?: string; }
}

const Drawer: FunctionComponent<DrawerProps> = ({ children, dismissHandler, isOpen, label, headerStyles }) => {
    return (
        <div className={`${classes.container} ${!isOpen ? classes.container_close : classes.container_open}`}>
            <Header styles={headerStyles} label={label}><CloseButton onClick={dismissHandler} /></Header>
            {children}
        </div>
    );
}

export default Drawer;