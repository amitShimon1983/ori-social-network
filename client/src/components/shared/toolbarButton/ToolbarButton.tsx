import { Box, SpeedDial, SpeedDialAction } from "@mui/material";
import { FunctionComponent } from "react";
import { CgMoreVertical } from "..";

interface ToolbarButtonProps {
    actions: { icon: React.ReactNode; name: string }[]
}
const boxStyles = { height: '100%', flexGrow: 1 };
const speedDialStyles = { position: 'absolute', bottom: 20, right: 0 };
const ToolbarButton: FunctionComponent<ToolbarButtonProps> = ({ actions }) => {
    return (
        <Box sx={boxStyles}>
            <SpeedDial
                FabProps={{ size: 'small' }}
                ariaLabel="Toolbar"
                sx={speedDialStyles}
                icon={<CgMoreVertical />}
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