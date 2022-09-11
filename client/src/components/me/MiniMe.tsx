import { FunctionComponent } from "react";
import classes from "./MiniMe.module.css";
import Me, { MeProps } from ".";

interface MiniMeProps extends MeProps {

}

const MiniMe: FunctionComponent<MiniMeProps> = ({ user, displaySpinner, navigateOnClick }) => {
    return (<div className={classes.comment_me}>
        <Me
            navigateOnClick={navigateOnClick}
            displaySpinner={displaySpinner}
            styles={{
                imageClass: classes.me_image,
                containerClassName: classes.me_container,
                emailClassName: classes.me_email
            }}
            user={user}
        />
    </div>);
}

export default MiniMe;