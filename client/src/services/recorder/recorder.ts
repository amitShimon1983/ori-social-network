export class Recorder {
    _mediaStream?: MediaStream;
    _mediaRecorder?: MediaRecorder;
    _recordedBlobs: any[];
    _recordedBlob?: Blob;
    _mimeType?: string;
    onRecordingStopHandler?: (blob: Blob) => void;
    onDataAvailableHandler?: (event: any) => void;
    constructor(mediaStream: MediaStream,
        onDataAvailable?: (event: any) => void,
        onRecordingStop?: (blob: Blob) => void,
        mimeType?: string) {
        this._mimeType = mimeType;
        this._mediaStream = mediaStream;
        this._recordedBlobs = [];
        this.onDataAvailableHandler = onDataAvailable;
        this.onRecordingStopHandler = onRecordingStop;
    }

    start(options: any) {
        if (this?._mediaStream) {
            this._mediaRecorder = new MediaRecorder(this?._mediaStream!, options);
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
        this._recordedBlob = new Blob(this._recordedBlobs, { type: this._mimeType || '' });
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