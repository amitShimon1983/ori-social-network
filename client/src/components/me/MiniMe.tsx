import { FunctionComponent } from "react";
import classes from "./MiniMe.module.css";
import Me, { MeProps } from ".";

interface MiniMeProps extends MeProps {
    user: any;
    styles?: { imageClass?: string; containerClassName?: string; emailClassName?: string; };
    displaySpinner: boolean;
    displayEmailAddress: boolean;
    navigateOnClick: boolean;
}

const MiniMe: FunctionComponent<MiniMeProps> = ({ user, displaySpinner, navigateOnClick, displayEmailAddress, styles }) => {
    return (<div className={classes.comment_me}>
        <Me
            label="You"
            displayEmailAddress={displayEmailAddress}
            navigateOnClick={navigateOnClick}
            displaySpinner={displaySpinner}
            styles={!!styles ? styles : {
                imageClass: classes.me_image,
                containerClassName: classes.me_container,
                emailClassName: classes.me_email
            }}
            user={user}
        />
    </div>);
}

export default MiniMe;