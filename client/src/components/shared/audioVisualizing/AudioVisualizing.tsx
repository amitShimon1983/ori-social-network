import React, { FunctionComponent, useEffect, useRef } from 'react'
import Button from '../button/Button';
import classes from './AudioVisualizing.module.css';
import { FaPlay } from "../icons";
import { DividerCustom } from '../../styles'
interface AudioVisualizingProps {
    audioUrl: string;
    id: string;
}

const AudioVisualizing: FunctionComponent<AudioVisualizingProps> = ({ audioUrl, id }) => {

    const audioRef = useRef<any>(null)
    const audio = new Audio(audioUrl);
    const drawLineSegment = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, isEven: any) => {
        ctx.lineWidth = 1.5; 
        ctx.strokeStyle = "#fff";
        ctx.beginPath();
        y = isEven ? y : -y;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, y);
        ctx.arc(x + width / 2, y, width / 2, 0, 0, isEven);
        ctx.lineTo(x + width, 0);
        ctx.stroke();
    };
    const filterData = (audioBuffer: AudioBuffer) => {
        const rawData = audioBuffer.getChannelData(0); 
        const samples = 70; 
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

    const normalizeData = (filteredData: number[]) => {
        const multiplier = Math.pow(Math.max(...filteredData), -1);
        return filteredData.map((n: any) => n * multiplier);
    }

    const draw = (normalizedData: number[]) => {
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
                    const isEven = (i + 1) % 2
                    drawLineSegment(ctx, x, height, width, isEven);
                }
            }
        }
    };
    useEffect(() => {
        const drawAudio = (url: string) => {
            const audioContext = new AudioContext();
            fetch(url)
                .then(response => response.arrayBuffer())
                .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
                .then(audioBuffer => draw(normalizeData(filterData(audioBuffer))));
        };
        drawAudio(audioUrl)
    }, [])

    const play = () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    }
    return (<div className={classes.container}>
        <Button className={classes.button} handleClick={(e) => {
            e.stopPropagation();
            play()
        }}><FaPlay /></Button>
        <div className={classes.divider_container}>
            <DividerCustom />
        </div>
        <canvas className={classes.canvas} ref={audioRef} id={`canvas_${id}`}>
        </canvas>

    </div>);
}

export default AudioVisualizing;