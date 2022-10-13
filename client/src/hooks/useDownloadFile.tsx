import { useState, useEffect, useCallback } from "react";
import { appConfig } from "../configuration";
import { httpService } from "../services";
const formatTime = (seconds: any) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    return [h, m > 9 ? m : h ? '0' + m : m || '0', s > 9 ? s : '0' + s]
        .filter(a => a)
        .join(':')
}
const filesUri = `${appConfig.serverUrl}${'/api/file/'}`
export function useDownloadFile({ fileName, skip }: { fileName: string; skip?: boolean; }) {

    const [url, setUrl] = useState<string>(filesUri + fileName);
    const [type, setType] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [fileDuration, setFileDuration] = useState<number>();
    const getBlobDuration = useCallback(async (blob: Blob) => {
        const audioCtx = new AudioContext();
        const blobBuffer = await blob.arrayBuffer();
        const buffer = await audioCtx.decodeAudioData(blobBuffer);
        if (buffer.duration) {
            const duration = buffer.duration;
            setFileDuration(duration);
        }
    }, []);
    useEffect(() => {
        setLoading(true);
        const loadFile = async () => {
            const blob: any = await httpService.getStream(url);
            const objectURL = URL.createObjectURL(blob);
            await getBlobDuration(blob)
            setType(blob?.type);
            setUrl(objectURL);
            setLoading(false);
        }
        if (fileName && !skip) {
            loadFile();
        }
    }, []);
    return { url, type, loading, fileDuration: !!fileDuration ? formatTime(fileDuration) : "" }
}
