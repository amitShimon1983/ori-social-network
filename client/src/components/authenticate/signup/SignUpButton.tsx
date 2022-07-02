import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
interface SignUpButtonProps {

}

const SignUpButton: FunctionComponent<SignUpButtonProps> = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/sign-up")
    }
    return (<>
        <button onClick={handleClick}>Sign up...</button>
    </>);
}

export default SignUpButton;