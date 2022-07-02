import { FunctionComponent } from "react";
import { LoginButton } from "./";
import { SignUpButton } from "./";

interface AuthenticateProps {

}

const Authenticate: FunctionComponent<AuthenticateProps> = () => {
    return (<>
        <LoginButton />
        <SignUpButton />
    </>);
}

export default Authenticate;