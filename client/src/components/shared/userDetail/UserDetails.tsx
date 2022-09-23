import { FunctionComponent } from "react";
import { appContextVar } from "../../../services/store";
import classes from './UserDetails.module.css';
export const UserDetails: FunctionComponent<{ user: any; className?: string; }> = ({ user, className }) => {
    const { user: me } = appContextVar();
    const isMe = me._id === user?._id
    return <div className={`${className} ${classes.user} ${isMe ? classes.me : classes.other}`}> {isMe ? 'You' : user?.name}</div >;
}