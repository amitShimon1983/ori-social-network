import { PopoverOrigin, SxProps, Theme } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { BiSmile, IconButton, Popover } from "..";
import { Reaction } from "../../../models";
import classes from './index.module.css';
interface ReactionListProps {
    id: string;
    transformOrigin?: PopoverOrigin | undefined;
    anchorOrigin?: PopoverOrigin | undefined;
    onItemClick: (item: Reaction) => Promise<void> | void;
    popoverSx?: SxProps<Theme>;
}
const reactions: Reaction[] = [
    { emoji: '❤️', _id: '1' },
    { emoji: '😆', _id: '2' },
    { emoji: '😯', _id: '4' },
    { emoji: '😢', _id: '5' },
    { emoji: '😡', _id: '6' },
    { emoji: '👍', _id: '7' },
    { emoji: '👎', _id: '8' }
];
const ReactionList: FunctionComponent<ReactionListProps> = ({ popoverSx, onItemClick, id, transformOrigin, anchorOrigin }) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    return (
        <div className={classes.container}>
            <IconButton className={classes.button} onClick={handleClick}>
                <BiSmile />
            </IconButton>
            <Popover
                sx={popoverSx ?? {
                    ".MuiPopover-paper": {
                        borderRadius: '20px',
                        padding: '10px'
                    }
                }}
                id={'ReactionList_' + id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={anchorOrigin ?? {
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={transformOrigin ?? {
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
            >
                {reactions.map((reaction: Reaction) => {
                    return <span onClick={() => onItemClick(reaction)} key={reaction._id}>{reaction.emoji}</span>
                })}
            </Popover>
        </div>

    );
}

export default ReactionList;