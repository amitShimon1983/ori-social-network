import { PopoverOrigin, SxProps, Theme, Zoom } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { BiSmile, IconButton, Popover } from "..";
import { useGetAppReactions } from "../../../hooks";
import { Reaction } from "../../../models";
import classes from './index.module.css';
interface ReactionListProps {
    id: string;
    transformOrigin?: PopoverOrigin | undefined;
    anchorOrigin?: PopoverOrigin | undefined;
    onItemClick: (item: Reaction) => Promise<void> | void;
    popoverSx?: SxProps<Theme>;
}
const itemStyles = { transitionDelay: '100ms' }
const ReactionList: FunctionComponent<ReactionListProps> = ({ popoverSx, onItemClick, id, transformOrigin, anchorOrigin }) => {
    const { data } = useGetAppReactions();
    const reactions = data?.getAppReactions?.reactions || []
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
                sx={popoverSx}
                id={'ReactionList_' + id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                closeAfterTransition
                anchorOrigin={anchorOrigin ?? {
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={transformOrigin ?? {
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
            >
                <div className={`${classes.list} `}>
                    {reactions.map((reaction: Reaction) => {
                        return (<span key={`reaction_item_${reaction._id}`}>
                            <Zoom style={itemStyles} in={open}>
                                <span className={classes.reaction_item} onClick={() => {
                                    onItemClick(reaction);
                                    setAnchorEl(null);
                                }} >{reaction.emoji}</span>
                            </Zoom>
                        </span>)
                    })}
                </div>
            </Popover>
        </div>

    );
}

export default ReactionList;