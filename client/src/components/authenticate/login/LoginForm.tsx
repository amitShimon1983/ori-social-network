import { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router";
import { appConfig } from "../../../configuration";
import { httpService } from "../../../services";
import { validateEmail } from "../../../utils";
import { Input } from "../../shared";
import Button from "../../shared/button/Button";

interface LoginFormProps {

}
const initialState = { email: '', password: '' };
interface Login {
    email: string;
    password: string;
}
const LoginForm: FunctionComponent<LoginFormProps> = () => {
    const [login, setLogin] = useState<Login>(initialState);
    const [isValid, setIsValid] = useState<boolean>(false)
    const navigate = useNavigate();

    const handleChange = ({ target }: { target: any }) => {
        console.log({ target });
        setLogin((prev) => {
            const newState = { ...prev, [target?.name]: target?.value };
            if ((newState?.email && validateEmail(newState.email)) && newState.password) {
                setIsValid(true)
            }
            return (newState)
        })
    }

    const onSuccess = (payload: any) => {
        setIsValid(false);
        setLogin(initialState);
        localStorage.setItem('user', JSON.stringify(payload));
        navigate("/home");
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const url = `${appConfig.serverUrl}${appConfig.loginEndpoint}`
        const res: any = await httpService.post(url, JSON.stringify(login));
        debugger
        if (res.status === 200) {
            onSuccess(res.payload);
        }
    }

    return (<form>
        <Input value={login.email} placeholder='Email' type='email' name='email' required handleChange={handleChange} />
        <Input value={login.password} placeholder="Password" type='password' name='password' required handleChange={handleChange} />
        <Button disabled={!isValid} handleClick={handleSubmit}>Sign in...</Button>
    </form>);
}

export default LoginForm;