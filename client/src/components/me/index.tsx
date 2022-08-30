import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { appConfig } from "../../configuration";
import { httpService } from "../../services";
import { Video } from "../video";
import classes from './Me.module.css';

interface MeProps {
    user: any;
    styles?: { imageClass?: string; containerClassName?: string; emailClassName?: string; };
}
const filesUri = `${appConfig.serverUrl}${'/api/file/post/'}`
const Me: FunctionComponent<MeProps> = ({ user, styles }) => {
    const [url, setUrl] = useState<string>('');
    const [type, setType] = useState<string>('');
    const navigate = useNavigate();
    const handleNavigateToUser = () => navigate(`/other/${user._id}`);
    useEffect(() => {
        const loadFile = async () => {
            const blob: any = await httpService.getStream(filesUri + user.file.originalname);
            const objectURL = URL.createObjectURL(blob);
            setType(blob?.type)
            setUrl(objectURL)
        }
        loadFile();
    }, [])
    const isVideo = type?.trim()?.toLowerCase()?.includes('video');
    return (<>
        <div className={`${classes.container} ${styles?.containerClassName}`}>
            {url && isVideo && <div className={styles?.imageClass}>
                <Video videoClassName={classes.video} type={type} link={url} />
            </div>
            }
            {url && !isVideo && <img className={styles?.imageClass} src={url} alt={'profilePicture'} />}
            {<p onClick={handleNavigateToUser} className={`${classes.email} ${styles?.emailClassName}`}>{user?.email}</p>}
        </div>
    </>
    );
}

export default Me;