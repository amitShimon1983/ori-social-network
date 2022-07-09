import { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router";
import { authService } from "../../../services";
import { validateEmail } from "../../../utils";
import { Input } from "../../shared";
import Button from "../../shared/button/Button";

interface LoginFormProps {
    setUser: React.Dispatch<React.SetStateAction<{
        [key: string]: any;
    } | undefined>>
}
const initialState = { email: '', password: '' };
interface Login {
    email: string;
    password: string;
}
const LoginForm: FunctionComponent<LoginFormProps> = ({ setUser }) => {
    const [login, setLogin] = useState<Login>(initialState);
    const [isValid, setIsValid] = useState<boolean>(false)
    const navigate = useNavigate();

    const handleChange = ({ target }: { target: any }) => {
        setLogin((prev) => {
            const newState = { ...prev, [target?.name]: target?.value };
            if ((newState?.email && validateEmail(newState.email)) && newState.password) {
                setIsValid(true)
            }
            return (newState)
        })
    }

    const onSuccess = (payload: any) => {
        setUser({ user: payload, isAuthenticate: true })
        navigate("/home");
    }

    const handleSubmit = async (event: any) => {
        debugger
        event.preventDefault();
        await authService.login(login, (payload) => {
            onSuccess(payload)
        })
    }

    return (<form>
        <Input value={login.email} placeholder='Email' type='email' name='email' required handleChange={handleChange} />
        <Input value={login.password} placeholder="Password" type='password' name='password' required handleChange={handleChange} />
        <Button disabled={!isValid} handleClick={handleSubmit}>Sign in...</Button>
    </form>);
}

export default LoginForm;