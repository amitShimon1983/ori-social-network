export class Recorder {
    cameraStream?: MediaStream;
    mediaRecorder?: MediaRecorder;
    recordedBlobs: any[];
    // video/webm
    /*
      const options = {
                audioBitsPerSecond: 128000,
                videoBitsPerSecond: 2500000,
                mimeType: 'video/mp4'
       }
     */
    constructor(camera_stream: MediaStream) {
        this.cameraStream = camera_stream;
        this.recordedBlobs = []
    }
    start() {
        if (this?.cameraStream) {
            this.mediaRecorder = new MediaRecorder(this?.cameraStream!, { mimeType: 'video/webm' });
            this.mediaRecorder.ondataavailable = this._onDataAvailable.bind(this);
            this.mediaRecorder.onstop = this._onRecordingStop.bind(this);
            this.mediaRecorder.start(15000);
        }
    }
    stop() {
        if (this.mediaRecorder) {
            this.mediaRecorder?.stop()
        }
    }
    _onRecordingStop() {
        let video_local = URL.createObjectURL(new Blob(this.recordedBlobs, { type: 'video/webm' }));
        this.mediaRecorder = undefined;
        this.cameraStream = undefined;
        this.recordedBlobs = []
    }
    _onDataAvailable(event: any) {
        this.recordedBlobs.push(event.data)
    }

}