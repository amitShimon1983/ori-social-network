import { FunctionComponent, useEffect, useRef, useState } from "react";
import { getPostDate } from "../../../services/date";
import { isOverflow } from "../../../utils";
import MiniMe from "../../me/MiniMe";
import Button from "../button/Button";
import { ReadMore } from "../readMore";

import classes from './Card.module.css';
interface CardProps {
    _id: string;
    content: string;
    createdAt: string;
    user: any;
    displayButtons: boolean;
    navigateOnClick: boolean;
}

const Card: FunctionComponent<CardProps> = ({ _id,
    content,
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
            <ReadMore content={content} displayButtons={displayButtons} />
        </div>
        
    </div>);
}

export default Card;