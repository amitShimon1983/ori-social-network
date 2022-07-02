import { FunctionComponent, useState } from "react";
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

    const handleChange = ({ target }: { target: any }) => {
        console.log({ target });
        setLogin((prev) => ({ ...prev, [target?.name]: target?.value }))
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        //logic
        setLogin(initialState)
    }

    return (<form>
        <Input value={login.email} placeholder='Email' type='email' name='email' required handleChange={handleChange} />
        <Input value={login.password} placeholder="Password" type='password' name='password' required handleChange={handleChange} />
        <Button disabled={!isValid} handleClick={handleSubmit}>Sign in...</Button>
    </form>);
}

export default LoginForm;