import { Skeleton as SkeletonMUI, Stack } from "@mui/material";
import { FunctionComponent } from "react";


interface SkeletonProps {
    className?: string;
}

const Skeleton: FunctionComponent<SkeletonProps> = ({ className }) => {
    return (<Stack spacing={1} height={'100%'}>
        <SkeletonMUI width="100%" height={'100%'} variant="rounded" />
        <SkeletonMUI width="100%" variant="rounded" />
        <SkeletonMUI width="100%" variant="rounded" />
        <SkeletonMUI width="100%" variant="rounded" />
        <SkeletonMUI width="100%" variant="rounded" />
        <SkeletonMUI width="100%" variant="rectangular" />
    </Stack>);
}

export default Skeleton;