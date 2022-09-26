import { Badge as BadgeMUI, SxProps, Theme } from '@mui/material'
import { FunctionComponent } from 'react';
interface BadgeProps {
    count?: number | any;
    max?: number;
    children: React.ReactNode;
    style?: any;
    anchorOrigin: any;
    sx?: SxProps<Theme> | undefined;
    overlap?: "circular" | "rectangular" | undefined;
    variant?: "dot" | "standard" | undefined;
    color?: "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" | undefined;
}

const Badge: FunctionComponent<BadgeProps> = ({ sx, variant, overlap, count, children, max, style, anchorOrigin, color }) => {
    return (<BadgeMUI
        sx={sx}
        variant={variant}
        overlap={overlap}
        style={style}
        showZero
        anchorOrigin={anchorOrigin} max={max || 99} badgeContent={count} color={color}>{children}</BadgeMUI>);
}

export default Badge;