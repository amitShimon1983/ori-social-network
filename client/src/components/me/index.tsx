import { useReactiveVar } from "@apollo/client";
import { FunctionComponent, useEffect, useState } from "react";
import { appConfig } from "../../configuration";
import { httpService } from "../../services";
import { appContextVar } from "../../services/store";
import { Video } from "../video";
import classes from './Me.module.css';

interface MeProps {

}
const filesUri = `${appConfig.serverUrl}${'/api/file/post/'}`
const Me: FunctionComponent<MeProps> = () => {
    const [url, setUrl] = useState<string>('');
    const [type, setType] = useState<string>('');
    const { user } = appContextVar();

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
    return (
        <div className={classes.container}>
            {url && isVideo && <div className={classes.image}>
                <Video videoClassName={classes.video} type={type} link={url} />
            </div>
            }
            {url && !isVideo && <img className={classes.image} style={{ height: '100%', width: '100%', objectFit: 'cover' }} src={url} alt={'post'} />}
        </div>
    );
}

export default Me;