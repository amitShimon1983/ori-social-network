class CameraService {
    static instance: CameraService;
    static getInstance(): CameraService {
        if (!CameraService.instance) {
            CameraService.instance = new CameraService()
        }
        return CameraService.instance;
    }
    async getVideo(constraints?: MediaStreamConstraints | undefined, onSuccess?: (stream: MediaStream) => void) {
        const stream: MediaStream = await navigator.mediaDevices.getUserMedia(constraints);
        if (typeof onSuccess === 'function') {
            onSuccess(stream)
        }
        return stream;
    }
}

export default CameraService.getInstance()