import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import { FunctionComponent } from "react";

interface ToolbarButtonProps {
    actions: { icon: React.ReactNode; name: string }[]
}
const boxStyles = { height: '100%', transform: 'translateZ(0px)', flexGrow: 1 };
const speedDialStyles = { position: 'absolute', bottom: 16, right: 16 };
const ToolbarButton: FunctionComponent<ToolbarButtonProps> = ({ actions }) => {
    return (
        <Box sx={boxStyles}>
            <SpeedDial
                ariaLabel="Toolbar"
                sx={speedDialStyles}
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