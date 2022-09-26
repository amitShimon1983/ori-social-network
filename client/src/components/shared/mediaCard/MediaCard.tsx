import { FunctionComponent } from "react";
import { appConfig } from "../../../configuration";
import { CardMedia } from "../mui";
import classes from './MediaCard.module.css'

interface MediaCardProps {
    message: any;
    isMe: boolean;
}

const MediaCard: FunctionComponent<MediaCardProps> = ({ message, isMe }) => {
    return (<CardMedia src={`${appConfig.serverUrl}${'/api/file/post/'}${message?.file?.originalname}`}>
        <audio className={`${classes.audio} ${isMe ? classes.me : classes.other}`} controls>
            <source src={`${appConfig.serverUrl}${'/api/file/post/'}${message?.file?.originalname}`} type="audio/webm" />
            <source src={`${appConfig.serverUrl}${'/api/file/post/'}${message?.file?.originalname}`} type="audio/mpeg" />
            Your browser does not support the audio tag.
        </audio>
    </CardMedia>);
}

export default MediaCard;