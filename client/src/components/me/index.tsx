import { FunctionComponent } from "react";
import { useNavigate } from "react-router";
import { useDownloadFile } from "../../hooks";
import { appContextVar } from "../../services/store";
import { addMinutes } from "../../utils";
import { Badge, Spinner } from "../shared";
import { Video } from "../video";
import classes from './Me.module.css';

export interface MeProps {
    user: any;
    label?: string;
    styles?: { imageClass?: string; containerClassName?: string; emailClassName?: string; };
    displaySpinner: boolean;
    displayEmailAddress: boolean;
    navigateOnClick: boolean;
}
const userStatusStyles = { '.MuiBadge-badge': { width: 12, height: 12, borderRadius: '50%' } }
const Me: FunctionComponent<MeProps> = ({ displayEmailAddress, user, styles, displaySpinner, navigateOnClick, label }) => {
    const { user: me } = appContextVar();
    const isMe = me._id === user?._id
    const navigate = useNavigate();
    const handleNavigateToUser = () => navigate(`/other/${user._id}`);
    const { url, loading, type }: {
        url: string;
        type: string;
        loading: boolean;
    } = useDownloadFile({ fileName: user.file.originalname || '' });
    const isVideo = type?.trim()?.toLowerCase()?.includes('video');
    const isOnline = !!user.lastSeen && new Date(+user.lastSeen) > addMinutes(-5);
    return (<>
        <div className={`${classes.container} ${styles?.containerClassName}`}>
            {loading && displaySpinner && <Spinner label={'Loading'} />}
            <Badge sx={userStatusStyles} overlap="circular" variant="dot" anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }} color={isOnline ? "success" : 'error'} count=" " >
                <div className={styles?.imageClass}>
                    {isVideo ? <Video videoClassName={classes.video} type={type} link={url} /> : <img className={styles?.imageClass} src={url} alt={'profilePicture'} />}
                </div>
            </Badge>
            {displayEmailAddress && <p onClick={navigateOnClick ? handleNavigateToUser : () => { }} className={`${classes.email} ${styles?.emailClassName}`}>{isMe && label ? label : user?.email}</p>}
        </div>
    </>
    );
}

export default Me;