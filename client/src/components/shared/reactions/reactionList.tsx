import { PopoverOrigin } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { BiSmile, Button, Popover } from "..";
interface Reaction { emoji: string; _id: string }
interface ReactionListProps {
    id: string;
    transformOrigin?: PopoverOrigin | undefined;
    anchorOrigin?: PopoverOrigin | undefined;
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
const ReactionList: FunctionComponent<ReactionListProps> = ({ id, transformOrigin, anchorOrigin }) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    return (
        <div>
            <Button handleClick={handleClick}>
                <BiSmile />
            </Button>
            <Popover
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
                    return <span key={reaction._id}>{reaction.emoji}</span>
                })}
            </Popover>
        </div>

    );
}

export default ReactionList;