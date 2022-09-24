import { FunctionComponent } from "react";
import { getPostDate } from "../../../services/date";
import MiniMe from "../../me/MiniMe";
import { Counter } from "../counter";
import { ReadMore } from "../readMore";

import classes from './Card.module.css';
interface CardProps {
    content: string;
    createdAt: string;
    user: any;
    displayButtons: boolean;
    navigateOnClick: boolean;
    counter?: number;
}

const Card: FunctionComponent<CardProps> = ({
    content,
    counter,
    createdAt,
    user,
    displayButtons,
    navigateOnClick }) => {


    const date = new Date(+createdAt);
    const diff = getPostDate(date);

    return (<div className={classes.container}>
        <div className={classes.header}>
            <div className={classes.details}>
                <div className={classes.mini_me_container}>
                    <MiniMe displayEmailAddress={true} navigateOnClick={navigateOnClick} user={user} displaySpinner={false} />
                </div>
                <div className={classes.date}> {diff}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <ReadMore content={content} displayButtons={displayButtons} />
                {!!counter && <Counter counter={counter} />}
            </div>
        </div>

    </div>);
}

export default Card;