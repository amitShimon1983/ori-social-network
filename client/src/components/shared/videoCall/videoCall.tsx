import { FunctionComponent, useCallback, useEffect, useRef, useState } from "react";
import { Fab, HiOutlinePhoneIncoming, TbPhoneOff, VideoElement } from "..";
import { useAnswerCall, useSendIceCandidate, useStartCall } from "../../../hooks";
import useOnIceCandidate from "../../../hooks/useOnIceCandidate";
import { cameraService } from "../../../services";
import Me from "../../me";
import classes from './videoCall.module.css';
import { v4 as uuidv4 } from 'uuid';

interface VideoCallProps {
    callTo?: { [key: string]: any };
    callerSdp?: string;
    recipientSdp?: string;
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
const VideoCall: FunctionComponent<VideoCallProps> = ({ callTo, callerSdp, recipientSdp, onCloseHandler }) => {
    const creatorVideoRef = useRef<HTMLVideoElement | null>(null);
    const visitorVideoRef = useRef<HTMLVideoElement | null>(null);
    const pc = useRef<RTCPeerConnection | null>(null);
    const [stream, setStream] = useState<MediaStream>();
    const [callStarted, setCallStarted] = useState<boolean>(false);
    const { startCallMutation } = useStartCall();
    const { answerCallMutation } = useAnswerCall();
    const { sendIceCandidateMutation } = useSendIceCandidate();
    const { data: candidateData } = useOnIceCandidate();

    const getUserVideo = useCallback(async () => {
        pc.current = new RTCPeerConnection();
        const userStream = await cameraService.getCameraStream(deviceMediaOptions);
        if (userStream) {
            const id = uuidv4();
            pc.current.onicecandidate = (e) => {
                if (e.candidate) {
                    sendIceCandidateMutation({
                        variables: {
                            icecandidate: JSON.stringify(e.candidate),
                            addressee: callTo?.email,
                            id
                        }
                    })
                }
            }
            pc.current.onconnectionstatechange = (ev) => {
                switch (pc.current?.connectionState) {
                    case "new":
                        break;
                    case "connected":
                        setCallStarted(true)
                        break;
                    case "disconnected":
                    case "closed":
                    case "failed":
                        setCallStarted(false);
                        close();
                        break;
                    default:
                        break;
                }
            }

            pc.current.addEventListener("connectionstatechange", (ev) => {
                switch (pc.current?.connectionState) {
                    case "disconnected":
                    case "closed":
                    case "failed":
                        setCallStarted(false);
                        close();
                        break;
                    default:
                        break;
                }
            }, false);
            
            pc.current.ontrack = (e) => {
                if (visitorVideoRef.current) { visitorVideoRef.current.srcObject = e.streams[0] }
            }
            userStream.getTracks().forEach(track => {
                pc?.current?.addTrack(track, userStream)
            })
            const video: any = creatorVideoRef.current;
            if (video) {
                video.srcObject = userStream;
                video.play();
            }
            setStream(userStream);
            if (!callerSdp) {
                createOffer()
            }
        }
    }, []);
    useEffect(() => {
        if (!stream) {
            getUserVideo();
        }
        return () => {
            if (stream) { cameraService.closeCamera(stream); }
        }
    }, [stream, getUserVideo])
    useEffect(() => {
        if (!!recipientSdp) {
            const sdp = JSON.parse(recipientSdp);
            if (!!sdp) { remoteDescription(sdp) }
        }
    }, [recipientSdp])

    useEffect(() => {
        if (candidateData?.onIceCandidate?.icecandidate) {
            const icecandidate = JSON.parse(candidateData?.onIceCandidate?.icecandidate);
            if (icecandidate) { addCandidates(icecandidate); }
        }
    }, [candidateData?.onIceCandidate?.icecandidate])

    const remoteDescription = async (sdp: any) => {
        pc.current?.setRemoteDescription(new RTCSessionDescription(sdp))
    }

    const createOffer = useCallback(async () => {
        try {
            if (pc.current) {
                const sdp = await pc.current.createOffer({
                    offerToReceiveAudio: true,
                    offerToReceiveVideo: true,
                });
                if (sdp) {
                    startCallMutation({
                        variables: {
                            sdp: JSON.stringify(sdp),
                            addressee: callTo?.email,
                            id: uuidv4()
                        }
                    })
                    pc.current.setLocalDescription(sdp)
                }
            }
        } catch (error: any) {
            console.log('createOffer', error);
        }
    }, [callTo?.email, startCallMutation])

    const createAnswer = async () => {
        try {
            if (pc.current) {
                if (!!callerSdp) {
                    const sdp = JSON.parse(callerSdp);
                    if (!!sdp) { remoteDescription(sdp) }
                }
                const sdp = await pc.current.createAnswer({
                    offerToReceiveAudio: true,
                    offerToReceiveVideo: true,
                });
                answerCallMutation({
                    variables: {
                        sdp: JSON.stringify(sdp),
                        addressee: callTo?.email,
                        id: uuidv4()
                    }
                })
                if (sdp) {
                    pc.current.setLocalDescription(sdp)
                }
            }
        } catch (error: any) {
            console.log('createAnswer', error);
        }
    }

    const addCandidates = async (candidate: any) => {
        pc.current?.addIceCandidate(new RTCIceCandidate(candidate))
    }
    const close = async () => {
        if (stream) { cameraService.closeCamera(stream); }
        if (pc.current) {
            pc.current.close()
        }
        if (typeof onCloseHandler === 'function') {
            onCloseHandler();
        }
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
            <VideoElement className={`${classes.video_me} ${callStarted ? classes.visible : classes.hidden}`} video={{ controls: false, muted: true, autoPlay: true }} ref={creatorVideoRef} />
            <VideoElement className={`${classes.video_visitor} ${callStarted && classes.shadow}`} video={{ controls: false, autoPlay: true }} ref={visitorVideoRef} />
            <div className={classes.buttons_container}>
                {!callStarted && callerSdp && <Fab
                    color="success"
                    className={`${classes.fab} ${!callStarted && callerSdp && classes.fab_incoming}`}
                    onClick={createAnswer}>
                    <HiOutlinePhoneIncoming />
                </Fab>}
                <Fab
                    color="error"
                    className={`${classes.fab} ${!callStarted && classes.fab_close}`}
                    onClick={close}>
                    <TbPhoneOff />
                </Fab>
            </div>
        </div>
    );
}

export default VideoCall;
