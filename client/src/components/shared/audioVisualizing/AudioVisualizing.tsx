import { FunctionComponent, useEffect, useRef, useState } from 'react'
import Button from '../button/Button';
import classes from './AudioVisualizing.module.css';
import { FaPlay } from "../icons";
import { DividerCustom } from '../../styles';
import { FaPause } from 'react-icons/fa';
import { canvasService } from '../../../services';
interface AudioVisualizingProps {
    audioUrl: string;
    id: string;
}
const AudioVisualizing: FunctionComponent<AudioVisualizingProps> = ({ audioUrl, id }) => {
    const audioRef = useRef<any>(null);
    const myRef = useRef<any>(null);
    const audio = new Audio(audioUrl);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [points, setPoints] = useState<number[]>()
    useEffect(() => {
        canvasService.getAudioData(audioUrl).then((data) => {
            canvasService.drawAudio(data, id)
            setPoints(data)
        })
    }, [audioUrl, id])

    const play = () => {
        debugger
        console.log({ isPlaying, paused: audio.paused, played: audio.played });

        if (!isPlaying) {
            myRef.current.play();
            setIsPlaying((prev) => !prev);
            // canvasService.drawAudio(audioUrl, id)
        } else {
            myRef.current.pause();
            setIsPlaying((prev) => !prev)
        }
    }

    return (<div className={classes.container}>
        <audio
            ref={myRef}
            src={audioUrl}
            onEnded={(ev) => {
                setIsPlaying(false)
            }}
        />
        <Button className={classes.button} handleClick={play}>{!isPlaying ? <FaPlay /> : <FaPause fontSize={'25px'} />}</Button>
        <div className={classes.divider_container}>
            <DividerCustom />
        </div>
        <canvas className={classes.canvas} ref={audioRef} id={`canvas_${id}`}>
        </canvas>

    </div>);
}

export default AudioVisualizing;