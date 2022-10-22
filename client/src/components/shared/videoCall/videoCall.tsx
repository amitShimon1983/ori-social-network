import { FunctionComponent, useCallback, useEffect, useRef, useState } from "react";
import { useAnswerCall, useOnCallAnswer, useSendIceCandidate, useStartCall } from "../../../hooks";
import useOnIceCandidate from "../../../hooks/useOnIceCandidate";
import { cameraService } from "../../../services";

interface VideoCallProps {
    callerSdp: string;
    caller: string;
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
const VideoCall: FunctionComponent<VideoCallProps> = ({ callerSdp, caller }) => {
    const { startCallMutation } = useStartCall();
    const { answerCallMutation } = useAnswerCall();
    const { sendIceCandidateMutation } = useSendIceCandidate();
    const { data: candidateData } = useOnIceCandidate();
    const creatorVideoRef = useRef<HTMLVideoElement | null>(null);
    const visitorVideoRef = useRef<HTMLVideoElement | null>(null);
    const textRef = useRef<HTMLTextAreaElement | null>(null);
    const pc = useRef<RTCPeerConnection | null>(null);
    const [stream, setStream] = useState<MediaStream>();

    const getUserVideo = async () => {
        const userStream = await cameraService.getCameraStream(deviceMediaOptions);
        if (userStream) {
            const _pc = new RTCPeerConnection();
            _pc.onicecandidate = (e) => {
                if (e.candidate) {
                    sendIceCandidateMutation({
                        variables: {
                            icecandidate: JSON.stringify(e.candidate),
                            addressee: caller || 'test1@test1.com'
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
    };
    useEffect(() => {
        if (callerSdp) {
            const sdp = JSON.parse(callerSdp);
            remoteDescription(sdp)
        }
    }, [callerSdp])
    useEffect(() => {
        if (candidateData?.onIceCandidate?.icecandidate) {
            const icecandidate = JSON.parse(candidateData?.onIceCandidate?.icecandidate);
            addCandidates(icecandidate)
        }
    }, [candidateData?.onIceCandidate?.icecandidate])
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
                            addressee: 'test1@test1.com'
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
                const sdp = await pc.current.createAnswer({
                    offerToReceiveAudio: true,
                    offerToReceiveVideo: true,
                });
                answerCallMutation({
                    variables: {
                        sdp: JSON.stringify(sdp),
                        addressee: caller
                    }
                })
                if (sdp) {
                    pc.current.setLocalDescription(sdp)
                }
            }
        } catch (error: any) {
            console.log('createOffer', error);
        }
    }
    const remoteDescription = async (sdp: any) => {

        pc.current?.setRemoteDescription(new RTCSessionDescription(sdp))
    }
    const addCandidates = async (candidate: any) => {
        pc.current?.addIceCandidate(new RTCIceCandidate(candidate))
    }
    const close = async () => {
        if (stream) { cameraService.closeCamera(stream); }
    }
    return (<>
        {caller}
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <video muted style={{ width: 180, height: 180, background: 'black' }} autoPlay ref={creatorVideoRef} />
            <video style={{ width: 180, height: 180, background: 'black' }} autoPlay ref={visitorVideoRef} />
        </div>
        <div style={{ width: '100%', height: '100%', display: 'block' }}>
            <button onClick={createOffer}>Call</button>
            <button onClick={createAnswer}>Answer</button>
            <textarea ref={textRef}></textarea>
            <button onClick={close}>close</button>
        </div>
    </>
    );
}

export default VideoCall;
