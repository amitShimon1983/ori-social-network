import { FunctionComponent, useEffect, useState } from "react";
import { Video } from "../video";
import { VideoFooter } from "../videoFooter";
import { appConfig } from "../../configuration";
import { httpService } from "../../services";
import { PostDetails } from "./types";
import classes from './Post.module.css';
interface PostProps {
    post: PostDetails
}
const filesUri = `${appConfig.serverUrl}${'/api/file/post/'}`
const Post: FunctionComponent<PostProps> = ({ post }) => {
    const [url, setUrl] = useState<string>('')
    const [type, setType] = useState<string>('')
    useEffect(() => {
        const loadFile = async () => {
            const blob: any = await httpService.getStream(filesUri + post?.file?.originalname);
            const objectURL = URL.createObjectURL(blob);
            setType(blob?.type)
            setUrl(objectURL)
        }
        loadFile();
    }, [])
    const isVideo = type?.trim()?.toLowerCase()?.includes('video')
    return (<div className={classes.container}>
        {url && isVideo && <Video type={type} link={url} />}
        {url && !isVideo && <img style={{ height: '100%', width: '100%', objectFit: 'cover' }} src={url} alt={'post'} />}
        <VideoFooter />
    </div>);
}

export default Post;