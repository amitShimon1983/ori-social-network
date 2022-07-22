import { forwardRef, ForwardRefExoticComponent } from "react";

interface VideoElementProps {
    className?: string;
    children: React.ReactNode;
    video?: React.DetailedHTMLProps<React.VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>
}

const VideoElement: ForwardRefExoticComponent<VideoElementProps & React.RefAttributes<HTMLVideoElement>> = forwardRef<HTMLVideoElement, VideoElementProps>(({ video, children, className }, ref) => {
    return (<video ref={ref} className={className} {...video}>
        {children}
    </video>);
})

export default VideoElement;