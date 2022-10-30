export class CanvasService {
    static instance?: CanvasService;
    static getInstance() {
        if (!this.instance) {
            return new CanvasService()
        }
        return this.instance;
    }
    drawAudio(url: string, id: string) {
        const audioContext = new AudioContext();
        fetch(url)
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
            .then(audioBuffer => this.draw(this.normalizeData(this.filterData(audioBuffer)), id));
    };

    drawLineSegment(ctx: CanvasRenderingContext2D, x: number, y: number, color: string) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(x * 2, 1 - y);
        // ctx.fillRect(x + x, 1 - y, 1, y);
        // ctx.fillRect(x + x, y, 1, 1 - y);
        ctx.lineTo(x * 2, y);
        ctx.stroke();
    };
    draw(normalizedData: number[], id: string) {
        const canvas: HTMLCanvasElement | null = document.getElementById(`canvas_${id}`) as HTMLCanvasElement;
        if (canvas) {
            const dpr = window.devicePixelRatio || 1;
            const padding = 10;
            canvas.width = canvas.offsetWidth * dpr;
            canvas.height = (canvas.offsetHeight + padding * 2) * dpr;
            const ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.scale(dpr, dpr);
                ctx.translate(0, canvas.offsetHeight / 2 + padding);
                const width = canvas.offsetWidth / normalizedData.length;
                for (let i = 0; i < normalizedData.length; i++) {
                    const x = width * i;
                    let height: number = normalizedData[i] * canvas.offsetHeight - padding;
                    if (height < 0) {
                        height = 0;
                    } else if (height > canvas.offsetHeight / 2) {
                        height = canvas.offsetHeight / 2;
                    }
                    this.drawLineSegment(ctx, x, height, 'red');
                }
            }
        }
    };

    filterData(audioBuffer: AudioBuffer) {
        const rawData: Float32Array = audioBuffer.getChannelData(0);
        const samples = 150;
        const blockSize = Math.floor(rawData.length / samples);
        const filteredData: number[] = [];
        for (let i = 0; i < samples; i++) {
            let blockStart = blockSize * i;
            let sum = 0;
            for (let j = 0; j < blockSize; j++) {
                sum = sum + Math.abs(rawData[blockStart + j])
            }
            filteredData.push(sum / blockSize);
        }
        return filteredData;
    }
    normalizeData(filteredData: number[]) {
        const multiplier = Math.pow(Math.max(...filteredData), -1);
        return filteredData.map((n: any) => n * multiplier);
    }

}

export default CanvasService.getInstance();