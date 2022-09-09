import { FunctionComponent } from "react";
import { Button, } from "..";
import { ButtonProps } from "./Button";
interface ButtonAction extends ButtonProps {
    key: any;
}
interface ButtonListProps {
    styles: { containerClassName: string; }
    items: ButtonAction[]
}

const ButtonList: FunctionComponent<ButtonListProps> = ({ styles, items }) => {
    return (<div className={styles.containerClassName}>
        {items.map((item: ButtonAction) => <Button disabled={item.disabled} className={item.className} key={item.key} handleClick={item.handleClick} >{item.children}</Button>)}
    </div>);
}

export default ButtonList;