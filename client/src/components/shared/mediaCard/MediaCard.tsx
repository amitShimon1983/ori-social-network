import { FunctionComponent, useEffect, useState } from "react";
import { appConfig } from "../../../configuration";
import { httpService } from "../../../services";
import { Video } from "../../video";
import { CardMedia } from "../mui";
import classes from './MediaCard.module.css'

interface MediaCardProps {
    message: any;
    isMe: boolean;
    type: string;
}

const MediaCard: FunctionComponent<MediaCardProps> = ({ message, isMe, type }) => {
    const url = `${appConfig.serverUrl}${'/api/file/post/'}${message?.file?.originalname}`;
    return (<>
        {type === 'audio' && <CardMedia src={url}>
            <audio className={`${classes.audio} ${isMe ? classes.me : classes.other}`} controls>
                <source src={url} type="audio/webm" />
                <source src={url} type="audio/mpeg" />
                Your browser does not support the audio tag.
            </audio>
        </CardMedia>}
        {type === 'video' && <Video videoClassName={classes.video} type={'video/webm'} link={url} />}
    </>
    );
}

export default MediaCard;