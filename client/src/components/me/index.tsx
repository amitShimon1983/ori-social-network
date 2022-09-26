import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { appConfig } from "../../configuration";
import { httpService } from "../../services";
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
const filesUri = `${appConfig.serverUrl}${'/api/file/post/'}`
const Me: FunctionComponent<MeProps> = ({ displayEmailAddress, user, styles, displaySpinner, navigateOnClick, label }) => {
    const [url, setUrl] = useState<string>('');
    const [type, setType] = useState<string>('');
    const { user: me } = appContextVar();
    const isMe = me._id === user?._id
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const handleNavigateToUser = () => navigate(`/other/${user._id}`);
    useEffect(() => {
        if (displaySpinner) { setLoading(true); }
        const loadFile = async () => {
            const blob: any = await httpService.getStream(filesUri + user.file.originalname);
            const objectURL = URL.createObjectURL(blob);
            setType(blob?.type)
            setUrl(objectURL)
            if (displaySpinner) { setLoading(false) };
        }
        loadFile();
    }, [user.file.originalname, displaySpinner])
    const isVideo = type?.trim()?.toLowerCase()?.includes('video');
    const isOnline = !!user.lastSeen && new Date(+user.lastSeen) > addMinutes(-5);
    return (<>
        <div className={`${classes.container} ${styles?.containerClassName}`}>
            {loading && <Spinner label={'Loading'} />}
            <Badge overlap="circular" variant="dot" anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }} color={isOnline ? "success" : 'error'} count=" " >
                {url && isVideo && <div className={styles?.imageClass}>
                    <Video videoClassName={classes.video} type={type} link={url} />
                </div>
                }
                {url && !isVideo && <img className={styles?.imageClass} src={url} alt={'profilePicture'} />}
            </Badge>
            {displayEmailAddress && <p onClick={navigateOnClick ? handleNavigateToUser : () => { }} className={`${classes.email} ${styles?.emailClassName}`}>{isMe && label ? label : user?.email}</p>}
        </div>
    </>
    );
}

export default Me;