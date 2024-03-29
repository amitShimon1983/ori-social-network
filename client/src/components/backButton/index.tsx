import { FunctionComponent } from "react";
import { useNavigate } from "react-router";
import { IconButton, TiArrowBackOutline } from "../shared";
import classes from './index.module.css';

export const BackButton: FunctionComponent = () => {
    const navigate = useNavigate();
    return <div className={classes.container}>
        <IconButton
            className={classes.button}
            onClick={() => navigate(-1)}>
            <TiArrowBackOutline className={classes.icon} />
        </IconButton>
    </div>;
}