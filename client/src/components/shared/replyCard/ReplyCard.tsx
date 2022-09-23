import { FunctionComponent } from "react";
import { CloseButton } from "../closeButton";
import classes from './ReplyCard.module.css';
interface ReplyCardProps {
    handleDismiss: (event: any) => void | Promise<void>
    content: string;
    creator: string;
}

const ReplyCard: FunctionComponent<ReplyCardProps> = ({ handleDismiss, content, creator }) => {
    return (<>
        <div className={classes.container}>
            <div className={classes.details}>
                <div className={classes.content_container}>
                    <div className={classes.creator}>{creator}</div>
                    <div className={classes.content}>{content}</div>
                </div>
            </div>
            <CloseButton className={classes.icon} onClick={handleDismiss} />
        </div>
    </>);
}

export default ReplyCard;