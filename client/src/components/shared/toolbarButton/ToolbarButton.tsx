import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import { FunctionComponent } from "react";

interface ToolbarButtonProps {
    actions: { icon: React.ReactNode; name: string }[]
}

const ToolbarButton: FunctionComponent<ToolbarButtonProps> = ({ actions }) => {
    return (
        <Box sx={{ height: '100%', transform: 'translateZ(0px)', flexGrow: 1 }}>
            <SpeedDial
                open={true}
                ariaLabel="Toolbar"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
            >
                {actions.map((action: any) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                    />
                ))}
            </SpeedDial>
        </Box>);
}

export default ToolbarButton;