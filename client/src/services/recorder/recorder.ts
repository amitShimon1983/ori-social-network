export class Recorder {
    _mediaStream?: MediaStream;
    _mediaRecorder?: MediaRecorder;
    _recordedBlobs: any[];
    _recordedBlob?: Blob;
    onRecordingStopHandler?: (blob: Blob) => void;
    onDataAvailableHandler?: (event: any) => void;
    constructor(mediaStream: MediaStream, onDataAvailable?: (event: any) => void, onRecordingStop?: (blob: Blob) => void) {
        this._mediaStream = mediaStream;
        this._recordedBlobs = [];
        this.onDataAvailableHandler = onDataAvailable;
        this.onRecordingStopHandler = onRecordingStop;
    }

    start() {

        if (this?._mediaStream) {
            this._mediaRecorder = new MediaRecorder(this?._mediaStream!, {
                mimeType: 'video/webm',
                audioBitsPerSecond: 128000,
                videoBitsPerSecond: 2500000,
            });
            this._mediaRecorder.ondataavailable = this._onDataAvailable.bind(this);
            this._mediaRecorder.onstop = this._onRecordingStop.bind(this);
            this._mediaRecorder.start(1000);
        }
    }

    stop() {
        if (this._mediaRecorder) {
            this._mediaRecorder?.stop()
        }
    }

    _onRecordingStop() {
        this._recordedBlob = new Blob(this._recordedBlobs, { type: 'video/webm' });
        if (typeof this.onRecordingStopHandler === 'function') {
            this.onRecordingStopHandler(this._recordedBlob)
        }
        this._mediaRecorder = undefined;
        this._mediaStream = undefined;
        this._recordedBlobs = []
    }

    _onDataAvailable(event: any) {
        this._recordedBlobs.push(event.data);
        if (typeof this.onDataAvailableHandler === 'function') {
            this.onDataAvailableHandler(event)
        }
    }
    getRecordingResults() {
        return this._recordedBlob;
    }

}