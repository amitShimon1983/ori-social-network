import { FunctionComponent } from "react";
import { Button } from "..";
import classes from './Toolbar.module.css';
export interface Action {
    function: () => void; icon: React.ReactElement;
}
interface ToolbarProps {
    actions: Action[]
}

const Toolbar: FunctionComponent<ToolbarProps> = ({ actions }) => {
    return (<div className={classes.header_container}>
        {actions.map((action: Action) => <Button variant="text" className={classes.button} handleClick={action.function}> {action.icon}</Button>)}
    </div>);
}

export default Toolbar;