import { FunctionComponent } from "react";
import { useNavigate } from "react-router";
import { AiFillBackward, Button } from "../shared";
import classes from './index.module.css';

export const BackButton: FunctionComponent = () => {
    const navigate = useNavigate();
    return <div className={classes.container}>
        <Button
            className={classes.button}
            variant="text"
            handleClick={() => navigate(-1)}>
            <AiFillBackward className={classes.icon} />
        </Button>
    </div>;
}