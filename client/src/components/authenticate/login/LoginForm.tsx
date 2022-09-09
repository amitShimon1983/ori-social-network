import { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router";
import { authService } from "../../../services";
import { appContextVar } from "../../../services/store";
import { validateEmail } from "../../../utils";
import { Input, Button, Spinner } from "../../shared";
import Form from "../../shared/form";
import { Hr } from "../../styles/styles";
import classes from '../Auth.module.css';

interface LoginFormProps {

}
const initialState = { email: '', password: '' };
interface Login {
    email: string;
    password: string;
}
const LoginForm: FunctionComponent<LoginFormProps> = () => {
    const [login, setLogin] = useState<Login>(initialState);
    const [loading, setLoading] = useState<boolean>(false);
    const [isValid, setIsValid] = useState<boolean>(false)
    const [errors, setErrors] = useState<string[]>([])
    const navigate = useNavigate();
    const handleNavigateToSignUp = () => {
        navigate(`/sign-up`)
    };
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
        appContextVar({ user: payload, isAuthenticate: true })
        navigate("/home");
    }
    const onError = (payload: string[]) => {
        setErrors(payload)
    }

    const handleSubmit = async (event: any) => {
        setLoading(true)
        event.preventDefault();
        await authService.login(login, (payload) => {
            onSuccess(payload)
            setLoading(false)
        }, onError)
    }

    return (<>
        {loading && <div className={classes.container_loading}>
            <Spinner label='Loading' />
        </div>}
        {!loading && <Form>
            <div>
                <h2 className={classes.header}>Login...</h2>
                <Hr />
            </div>
            <Input className={classes.input} value={login.email} placeholder='Email' type='email' name='email' required handleChange={handleChange} />
            <Input className={classes.input} value={login.password} placeholder="Password" type='password' name='password' required handleChange={handleChange} />
            <div className={classes.button_panel}>
                <Button className={classes.button} disabled={!isValid} handleClick={handleSubmit}>Sign in</Button>
                <Button className={classes.button} handleClick={handleNavigateToSignUp}>Sign up</Button>
            </div>
            {!!errors.length && errors.map(error => (<div>{error}</div>))}
        </Form>}
    </>
    );
}

export default LoginForm;