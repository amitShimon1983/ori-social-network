export class Recorder {
    cameraStream?: MediaStream;
    mediaRecorder?: MediaRecorder;
    recordedBlobs: any[];
    recordedBlob?: Blob;
    onRecordingStopHandler?: (blob: Blob) => void;
    onDataAvailableHandler?: (event: any) => void;
    constructor(camera_stream: MediaStream, onDataAvailable?: (event: any) => void, onRecordingStop?: (blob: Blob) => void) {
        this.cameraStream = camera_stream;
        this.recordedBlobs = [];
        this.onDataAvailableHandler = onDataAvailable;
        this.onRecordingStopHandler = onRecordingStop;
    }

    start() {

        if (this?.cameraStream) {
            this.mediaRecorder = new MediaRecorder(this?.cameraStream!, {
                mimeType: 'video/webm',
                audioBitsPerSecond: 128000,
                videoBitsPerSecond: 2500000,
            });
            this.mediaRecorder.ondataavailable = this._onDataAvailable.bind(this);
            this.mediaRecorder.onstop = this._onRecordingStop.bind(this);
            this.mediaRecorder.start(1000);
        }
    }

    stop() {
        if (this.mediaRecorder) {
            this.mediaRecorder?.stop()
        }
    }

    _onRecordingStop() {
        this.recordedBlob = new Blob(this.recordedBlobs, { type: 'video/webm' });
        if (typeof this.onRecordingStopHandler === 'function') {
            this.onRecordingStopHandler(this.recordedBlob)
        }
        this.mediaRecorder = undefined;
        this.cameraStream = undefined;
        this.recordedBlobs = []
    }

    _onDataAvailable(event: any) {
        this.recordedBlobs.push(event.data);
        if (typeof this.onDataAvailableHandler === 'function') {
            this.onDataAvailableHandler(event)
        }
    }
    getRecordingResults() {
        return this.recordedBlob;
    }

}