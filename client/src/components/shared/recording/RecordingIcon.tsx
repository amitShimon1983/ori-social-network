import { FunctionComponent } from "react";
import classes from './Recording.module.css';
interface RecordingIconProps {
    children: React.ReactNode
}

const RecordingIcon: FunctionComponent<RecordingIconProps> = ({ children }) => {
    return (<>
        <div className={classes.container}></div>
        <span>{children || ''}</span>
    </>);
}

export default RecordingIcon;