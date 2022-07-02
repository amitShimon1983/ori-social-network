import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
interface LoginButtonProps {

}

const LoginButton: FunctionComponent<LoginButtonProps> = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/login")
    }
    return (<><button onClick={handleClick}>Login...</button></>);
}

export default LoginButton;