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
    const audioRef = useRef<any>(null)
    const audio = new Audio(audioUrl);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    audio.onended = (ev) => {
        setIsPlaying(false)
    }
    useEffect(() => {
        canvasService.drawAudio(audioUrl, id)
    }, [audioUrl, id])

    const play = () => {
        if (audio.paused) {
            audio.play();
            setIsPlaying(true);
            canvasService.drawAudio(audioUrl, id)
        } else {
            audio.pause();
            setIsPlaying(false)
        }
    }

    return (<div className={classes.container}>
        <Button className={classes.button} handleClick={(e) => {
            e.stopPropagation();
            play()
        }}>{!isPlaying ? <FaPlay /> : <FaPause fontSize={'25px'} />}</Button>
        <div className={classes.divider_container}>
            <DividerCustom />
        </div>
        <canvas className={classes.canvas} ref={audioRef} id={`canvas_${id}`}>
        </canvas>

    </div>);
}

export default AudioVisualizing;