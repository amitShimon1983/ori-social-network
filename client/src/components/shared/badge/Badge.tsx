import { Badge as BadgeMUI } from '@mui/material'
import { FunctionComponent } from 'react';
interface BadgeProps {
    count?: number | any;
    max?: number;
    children: React.ReactNode;
    style?: any;
    anchorOrigin: any;
    overlap?: "circular" | "rectangular" | undefined;
    variant?: "dot" | "standard" | undefined;
    color?: "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" | undefined;
}

const Badge: FunctionComponent<BadgeProps> = ({ variant, overlap, count, children, max, style, anchorOrigin, color }) => {
    return (<BadgeMUI
        variant={variant}
        overlap={overlap}
        style={style}
        showZero
        anchorOrigin={anchorOrigin} max={max || 99} badgeContent={count} color={color}>{children}</BadgeMUI>);
}

export default Badge;