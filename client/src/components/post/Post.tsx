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
    useEffect(() => {
        const loadPost = async () => {
            const blob: any = await httpService.getStream(filesUri + post.originalname);
            const objectURL = URL.createObjectURL(blob);
            setUrl(objectURL)
        }
        loadPost();
    }, [])
    return (<div className={classes.container}>
        {url && <Video type={'video/webm'} link={url} />}
        <VideoFooter />
    </div>);
}

export default Post;