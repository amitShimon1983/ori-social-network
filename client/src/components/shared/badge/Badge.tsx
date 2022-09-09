import { Badge as BadgeMUI } from '@mui/material'
import { FunctionComponent } from 'react';
interface BadgeProps {
    count: number;
    max: number;
    children: React.ReactNode
}

const Badge: FunctionComponent<BadgeProps> = ({ count, children, max }) => {
    return (<BadgeMUI
        style={{ position: 'absolute', top: '5px' }}
        showZero
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }} max={max || 99} badgeContent={count} color="default">{children}</BadgeMUI>);
}

export default Badge;