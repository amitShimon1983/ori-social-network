import { FunctionComponent } from "react";
import classes from './Counter.module.css';
interface CounterProps {
    counter: number;
}

export const Counter: FunctionComponent<CounterProps> = ({ counter }) => {
    return (<div className={classes.container}>{counter}</div>);
}