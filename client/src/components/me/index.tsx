import { FunctionComponent } from "react";
import classes from './Me.module.css';

interface MeProps {

}

const Me: FunctionComponent<MeProps> = () => {
    return (
        <div className={classes.container}>
            <img className={classes.image} src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRah8Pd0RdcdIYcVKSYWZOduMcROgcnqZH-rWxmw-sNHg&s'} alt='me' />
        </div>
    );
}

export default Me;