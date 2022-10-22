import { FunctionComponent, useCallback, useEffect, useRef, useState } from "react";
import { useAnswerCall, useOnCallAnswer, useOnCallCreated, useSendIceCandidate, useStartCall } from "../../../hooks";
import useOnIceCandidate from "../../../hooks/useOnIceCandidate";
import { cameraService } from "../../../services";

interface VideoCallProps {
    callTo?: string;
    callerSdp?: string;
    recipientSdp?: string;
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
const VideoCall: FunctionComponent<VideoCallProps> = ({ callTo, callerSdp, recipientSdp }) => {
    const creatorVideoRef = useRef<HTMLVideoElement | null>(null);
    const visitorVideoRef = useRef<HTMLVideoElement | null>(null);
    const pc = useRef<RTCPeerConnection | null>(null);
    const [stream, setStream] = useState<MediaStream>();
    const { startCallMutation } = useStartCall();
    const { answerCallMutation } = useAnswerCall();
    const { sendIceCandidateMutation } = useSendIceCandidate();
    const getUserVideo = useCallback(async () => {
        const userStream = await cameraService.getCameraStream(deviceMediaOptions);
        if (userStream) {
            const _pc = new RTCPeerConnection();
            _pc.onicecandidate = (e) => {
                if (e.candidate) {
                    sendIceCandidateMutation({
                        variables: {
                            icecandidate: JSON.stringify(e.candidate),
                            addressee: callTo
                        }
                    })
                }
            }
            _pc.oniceconnectionstatechange = (e) => {
                console.log(e);
            }
            _pc.ontrack = (e) => {
                if (visitorVideoRef.current) { visitorVideoRef.current.srcObject = e.streams[0] }
            }
            userStream.getTracks().forEach(track => {
                _pc.addTrack(track, userStream)
            })
            const video: any = creatorVideoRef.current;
            if (video) {
                video.srcObject = userStream;
                video.play();
            }
            setStream(userStream);
            pc.current = _pc
        }
    }, []);
    const { data: candidateData } = useOnIceCandidate();
    useEffect(() => {
        if (recipientSdp) {
            const sdp = JSON.parse(recipientSdp);
            remoteDescription(sdp)
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


    useEffect(() => {
        if (!stream) {
            getUserVideo();
        }
        return () => {
            if (stream) { cameraService.closeCamera(stream); }
        }
    }, [])

    const createOffer = async () => {
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
                            addressee: callTo
                        }
                    })
                    pc.current.setLocalDescription(sdp)
                }
            }
        } catch (error: any) {
            console.log('createOffer', error);
        }
    }
    const createAnswer = async () => {
        try {
            if (pc.current) {
                if (callerSdp) {
                    const sdp = JSON.parse(callerSdp);
                    remoteDescription(sdp)
                }
                const sdp = await pc.current.createAnswer({
                    offerToReceiveAudio: true,
                    offerToReceiveVideo: true,
                });
                answerCallMutation({
                    variables: {
                        sdp: JSON.stringify(sdp),
                        addressee: callTo
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
    }
    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            position: 'relative'
        }}>
            <span style={{
                position: 'absolute',
                top: 20,
                textAlign: 'center',
                color: 'white'
            }}>{callTo}</span>
            <video muted style={{
                width: '100%',
                height: '100%',
                background: 'black',
                objectFit: 'fill',
            }} autoPlay ref={creatorVideoRef} />
            <video style={{
                width: '40%',
                height: '30%',
                position: 'absolute',
                bottom: 20,
                background: 'red',
                right: 10,
                objectFit: 'fill',
            }} autoPlay ref={visitorVideoRef} />
            <div style={{
                position: 'absolute',
                bottom: 20,
                left: 0,
            }}>
                <button onClick={createOffer}>Call</button>
                <button onClick={createAnswer}>Answer</button>
                <button onClick={close}>close</button>
            </div>
        </div>
    );
}

export default VideoCall;
