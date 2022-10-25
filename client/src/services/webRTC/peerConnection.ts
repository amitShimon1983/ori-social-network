export class PeerConnection {
    peerConnection?: RTCPeerConnection;
    _stream?: MediaStream | undefined;
    _ontrack?: (e: RTCTrackEvent) => void | Promise<void>;
    _onCallConnected?: () => void | Promise<void>;
    _onCallDisconnected?: () => void | Promise<void>;
    _onIceCandidate?: (event: RTCIceCandidate) => void | Promise<void>;
    _onOfferCreated?: (sdp: any) => void | Promise<void>;
    _onAnswer?: (sdp: any) => void | Promise<void>;

    constructor(
        stream: MediaStream | undefined,
        ontrack?: (e: RTCTrackEvent) => void | Promise<void>,
        onCallConnected?: () => void | Promise<void>,
        onCallDisconnected?: () => void | Promise<void>,
        onIceCandidateHandler?: (event: RTCIceCandidate) => void | Promise<void>,
        onOfferCreated?: (sdp: any) => void | Promise<void>,
        onAnswer?: (sdp: any) => void | Promise<void>,
    ) {
        this.peerConnection = new RTCPeerConnection();
        this._stream = stream;
        this.peerConnection.onicecandidate = this.onicecandidate?.bind(this);
        this.peerConnection.onconnectionstatechange = this.onconnectionstatechange?.bind(this);
        this.peerConnection.ontrack = this.ontrack?.bind(this);
        this._ontrack = ontrack?.bind(this);
        this._onIceCandidate = onIceCandidateHandler?.bind(this);
        this._onOfferCreated = onOfferCreated?.bind(this);
        this._onAnswer = onAnswer?.bind(this);
        this._onCallConnected = onCallConnected;
        this._onCallDisconnected = onCallDisconnected;
        this.getTracks()
    }

    onicecandidate(event: RTCPeerConnectionIceEvent) {
        if (event.candidate) {
            this._onIceCandidate?.(event.candidate)
        }
    }
    _callConnected() {
        this._onCallConnected?.()
    }
    _callDisconnected() {
        this._onCallDisconnected?.()
    }
    onconnectionstatechange(event: Event) {
        debugger
        switch (this.peerConnection?.connectionState) {
            case "new":
                break;
            case "connected":
                this._callConnected();
                break;
            case "disconnected":
            case "closed":
            case "failed":
                this._callDisconnected();
                break;
            default:
                break;
        }
    }

    ontrack(event: RTCTrackEvent) {
        if (typeof this._ontrack === 'function') {
            this._ontrack(event);
        }
    }

    getTracks() {
        const stream = this._stream;
        if (stream) {
            stream.getTracks().forEach(track => {
                this.peerConnection?.addTrack(track, stream)
            })
        }
    }
    async createOffer() {
        const offerSdp = await this.peerConnection?.createOffer({
            offerToReceiveAudio: true,
            offerToReceiveVideo: true,
        })
        if (offerSdp) {
            this._onOfferCreated?.(offerSdp)
            await this.peerConnection?.setLocalDescription(offerSdp)
        }

    }
    async setRemoteDescription(sdp: any) {
        await this.peerConnection?.setRemoteDescription(new RTCSessionDescription(sdp))
    }
    async createAnswer(callerSdp: any) {
        if (this.peerConnection) {
            if (!!callerSdp) {
                await this.setRemoteDescription(callerSdp)
                // await this.peerConnection?.setRemoteDescription(new RTCSessionDescription(callerSdp))
            }
            const answerSdp = await this.peerConnection.createAnswer({
                offerToReceiveAudio: true,
                offerToReceiveVideo: true,
            });
            this._onAnswer?.(answerSdp)
            if (answerSdp) {
                await this.peerConnection.setLocalDescription(answerSdp)
            }
        }

    }
    async addIceCandidate(candidate: any) {
        this.peerConnection?.addIceCandidate(new RTCIceCandidate(candidate))
    }
}
