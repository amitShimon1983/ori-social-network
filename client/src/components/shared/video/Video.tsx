import { forwardRef, ForwardRefExoticComponent } from "react";

interface VideoProps {
    className?: string;
    children: React.ReactNode;
    video: React.DetailedHTMLProps<React.VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>
}

const Video: ForwardRefExoticComponent<VideoProps & React.RefAttributes<HTMLVideoElement>> = forwardRef<HTMLVideoElement, VideoProps>(({ video, children, className }, ref) => {
    return (<video ref={ref} className={className} {...video}>
        {children}
    </video>);
})

export default Video;