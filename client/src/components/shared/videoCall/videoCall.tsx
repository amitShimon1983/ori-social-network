import { FunctionComponent, useCallback, useEffect, useRef, useState } from "react";
import { VideoElement } from "..";
import { useAnswerCall, useOnCallAnswer, useSendIceCandidate, useStartCall } from "../../../hooks";
import useOnIceCandidate from "../../../hooks/useOnIceCandidate";
import { cameraService, PeerConnection } from "../../../services";
import Me from "../../me";
import classes from './videoCall.module.css';
import { v4 as uuidv4 } from 'uuid';
import { useStopwatch } from 'react-timer-hook';
import { VideoCallButtonList } from "./videoCallButtonList";

interface VideoCallProps {
    callTo?: { [key: string]: any };
    callerSdp?: string;
    onCloseHandler?: () => void;
}
const deviceMediaOptions = {
    video: {
        width: {
            min: 500,
            ideal: 500,
            max: 560,
        },
        height: {
            min: 720,
            ideal: 1080,
            max: 1440
        }
    }, audio: true
}

const VideoCall: FunctionComponent<VideoCallProps> = ({ callTo, callerSdp, onCloseHandler }) => {
    const creatorVideoRef = useRef<HTMLVideoElement | null>(null);
    const visitorVideoRef = useRef<HTMLVideoElement | null>(null);
    const pc = useRef<RTCPeerConnection | null>(new RTCPeerConnection());
    const [stream, setStream] = useState<MediaStream>();
    const [_peerConnection, setPeerConnection] = useState<PeerConnection>();
    const [callStarted, setCallStarted] = useState<boolean>(false);
    const [playAudio, setPlayAudio] = useState<boolean>(true);
    const [playVideo, setPlayVideo] = useState<boolean>(false);
    const { startCallMutation } = useStartCall();
    const { answerCallMutation } = useAnswerCall();
    const { sendIceCandidateMutation } = useSendIceCandidate();
    const {
        seconds,
        minutes,
        hours,
        start,
    } = useStopwatch({ autoStart: false });
    useOnIceCandidate(({ subscriptionData }) => {
        if (subscriptionData?.data?.onIceCandidate?.icecandidate) {
            const icecandidate = JSON.parse(subscriptionData?.data?.onIceCandidate?.icecandidate);
            if (icecandidate) {
                _peerConnection?.addIceCandidate(icecandidate);
            }
        }
    });
    useOnCallAnswer(({ subscriptionData }) => {
        if (subscriptionData.data?.onCallAnswer?.sdp) {
            const sdp = JSON.parse(subscriptionData.data?.onCallAnswer?.sdp);
            if (!!sdp) {
                _peerConnection?.setRemoteDescription(sdp);
                start();
            }
        }
    });
    const onTrack = (e: RTCTrackEvent) => {
        if (visitorVideoRef.current) {
            const calleeStream = e.streams[0]
            visitorVideoRef.current.srcObject = calleeStream;
        }
    }
    const onCallConnected = () => {
        setCallStarted(true);
        start()
    }
    const onCallDisconnected = () => {
        endConversation();
    }
    const onIceCandidate = async (candidate: RTCIceCandidate) => {
        const id = uuidv4();
        if (candidate) {
            sendIceCandidateMutation({
                variables: {
                    icecandidate: JSON.stringify(candidate),
                    addressee: callTo?.email,
                    id
                }
            })
        }
    }
    const getUserVideo = useCallback(async () => {
        const userStream = await cameraService.getCameraStream(deviceMediaOptions);
        const peerConnectionService = new PeerConnection(userStream,
            onTrack,
            onCallConnected,
            onCallDisconnected,
            onIceCandidate,
            onOfferCreated,
            onAnswer
        );
        setPeerConnection(peerConnectionService);
        if (userStream) {
            if (peerConnectionService.peerConnection) { pc.current = peerConnectionService.peerConnection; }
            const video: any = creatorVideoRef.current;
            if (video) {
                video.srcObject = userStream;
                video.play();
            }
            if (!playVideo) {
                cameraService.toggleMediaKind(userStream, 'video');
            }
            if (!playAudio) {
                cameraService.toggleMediaKind(userStream, 'audio');
            }
            setStream(userStream);
            if (!callerSdp) {
                await peerConnectionService.createOffer();
            }
        }
    }, []);
    const onAnswer = async (sdp: any) => {
        answerCallMutation({
            variables: {
                sdp: JSON.stringify(sdp),
                addressee: callTo?.email,
                id: uuidv4()
            }
        })
    }
    const onOfferCreated = async (sdp: any) => {
        startCallMutation({
            variables: {
                sdp: JSON.stringify(sdp),
                addressee: callTo?.email,
                id: uuidv4()
            }
        })
    }
    useEffect(() => {
        if (!stream) {
            getUserVideo();
        }
        return () => {
            if (stream) { cameraService.closeCamera(stream); }
        }
    }, [stream, getUserVideo])
    const endConversation = async () => {
        if (stream) { cameraService.closeCamera(stream); }
        if (pc.current) {
            pc.current.close()
        }
        if (typeof onCloseHandler === 'function') {
            onCloseHandler();
        }
    }
    const formatTimer = (value: number) => value < 10 ? `0${value}` : value;
    const createAnswer = () => { if (callerSdp) { _peerConnection?.createAnswer(JSON.parse(callerSdp)) } }
    const toggleAudio = () => {
        cameraService.toggleMediaKind(stream, 'audio');
        setPlayAudio(prev => !prev);
    }
    const toggleVideo = () => {
        cameraService.toggleMediaKind(stream, 'video');
        setPlayVideo(prev => {
            return !prev;
        });
    }
    return (
        <div className={classes.container}>
            {!callStarted && <span className={` ${!callStarted ? classes.visible : classes.hidden}`}>
                <Me
                    label="You"
                    displayEmailAddress={true}
                    navigateOnClick={false}
                    displaySpinner={false}
                    styles={{
                        imageClass: classes.me_image,
                        containerClassName: classes.me_container,
                        emailClassName: classes.me_email
                    }}
                    user={callTo}
                />
            </span>}
            <span className={`${callStarted ? classes.timer : classes.hidden}`}>{formatTimer(hours)}:{formatTimer(minutes)}:{formatTimer(seconds)}</span>
            <VideoElement
                className={`${classes.video_me} ${callStarted && playVideo ? classes.visible : classes.hidden}`}
                video={{ controls: false, muted: true, autoPlay: true }}
                ref={creatorVideoRef} />
            <VideoElement
                className={`${classes.video_visitor} ${callStarted && classes.shadow} ${!playVideo && classes.hidden_video}`}
                video={{ controls: false, autoPlay: true }}
                ref={visitorVideoRef} />
            <VideoCallButtonList
                callStarted={callStarted}
                callerSdp={callerSdp}
                createAnswer={createAnswer}
                endConversation={endConversation}
                playAudio={playAudio}
                playVideo={playVideo}
                toggleAudio={toggleAudio}
                toggleVideo={toggleVideo}
            />
        </div>
    );

}
export default VideoCall;