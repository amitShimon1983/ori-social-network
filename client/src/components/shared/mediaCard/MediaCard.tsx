import { FunctionComponent } from "react";
import { useDownloadFile } from "../../../hooks";
import { Video } from "../../video";
import { CardMedia } from "../mui";
import classes from './MediaCard.module.css'

interface MediaCardProps {
    message: any;
    isMe: boolean;
    type: string;
}

const MediaCard: FunctionComponent<MediaCardProps> = ({ message, isMe, type }) => {
    const { fileDuration, url }: {
        url: string;
        fileDuration: string;
    } = useDownloadFile({ fileName: message?.file?.originalname });

    return (<>
        {type === 'audio' && url && <CardMedia src={url}>
            <audio preload="auto" className={`${classes.audio} ${isMe ? classes.me : classes.other}`} controls>
                <source src={url} type="audio/webm" />
                <source src={url} type="audio/mpeg" />
                Your browser does not support the audio tag.
            </audio>
        </CardMedia>}
        {type === 'video' && url && <Video
            containerClassName={classes.video_container}
            videoClassName={classes.video}
            type={'video/webm'} link={url} />}
        <span>{fileDuration}</span>
    </>
    );
}

export default MediaCard;


