import { FunctionComponent, useCallback, useEffect, useRef, useState } from "react";
import { cameraService } from "../../../services";

interface VideoCallProps {

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
const VideoCall: FunctionComponent<VideoCallProps> = () => {
    const creatorVideoRef = useRef<HTMLVideoElement | null>(null);
    const visitorVideoRef = useRef<HTMLVideoElement | null>(null);
    const textRef = useRef<HTMLTextAreaElement | null>(null);
    const pc = useRef<RTCPeerConnection | null>(null);
    const [stream, setStream] = useState<MediaStream>();
    const getUserVideo = useCallback(async () => {
        const userStream = await cameraService.getCameraStream(deviceMediaOptions);
        if (userStream) {
            const _pc = new RTCPeerConnection();
            _pc.onicecandidate = (e) => {
                if (e.candidate) {
                    console.log(e.candidate);
                }
            }
            _pc.oniceconnectionstatechange = (e) => {
                console.log(e);
            }
            _pc.ontrack = (e) => {
                console.log(e);
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

    useEffect(() => {
        if (!stream) {
            getUserVideo();
        }
        return () => {
            if (stream) { cameraService.closeCamera(stream); }
        }
    }, [stream, getUserVideo])

    const createOffer = async () => {
        try {
            if (pc.current) {
                const sdp = await pc.current.createOffer({
                    offerToReceiveAudio: true,
                    offerToReceiveVideo: true,
                });
                console.log(sdp);
                if (sdp) {
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
                console.log(sdp);
                if (sdp) {
                    pc.current.setLocalDescription(sdp)
                }
            }
        } catch (error: any) {
            console.log('createOffer', error);
        }
    }
    const remoteDescription = async () => {
        const sdp = JSON.parse(textRef?.current?.value || '');
        pc.current?.setRemoteDescription(new RTCSessionDescription(sdp))
    }
    const addCandidates = async () => {
        const candidate = JSON.parse(textRef?.current?.value || '');
        pc.current?.addIceCandidate(new RTCIceCandidate(candidate))
    }
    const close = async () => {
        if (stream) { cameraService.closeCamera(stream); }
    }
    return (<>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <video muted style={{ width: 180, height: 180, background: 'black' }} autoPlay ref={creatorVideoRef} />
            <video style={{ width: 180, height: 180, background: 'black' }} autoPlay ref={visitorVideoRef} />
        </div>
        <div style={{ width: '100%', height: '100%', display: 'block' }}>
            <button onClick={createOffer}>Create offer</button>
            <button onClick={createAnswer}>Create answer</button>
            <textarea ref={textRef}></textarea>
            <button onClick={remoteDescription}>Set remote description</button>
            <button onClick={addCandidates}>Add candidates</button>
            <button onClick={close}>close</button>
        </div>
    </>
    );
}

export default VideoCall;
