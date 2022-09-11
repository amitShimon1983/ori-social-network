import { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router";
import { authService } from "../../../services";
import { appContextVar } from "../../../services/store";
import { validateEmail } from "../../../utils";
import { Input, Spinner, ButtonList, Header } from "../../shared";
import Form from "../../shared/form";
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
        <div className={classes.sign_up_header}>
            <Header label={'Login...'} />
        </div>
        {!loading && <Form>
            <div className={classes.inputs_container}>
                <Input className={classes.input} value={login.email} placeholder='Email' type='email' name='email' required handleChange={handleChange} />
                <Input className={classes.input} value={login.password} placeholder="Password" type='password' name='password' required handleChange={handleChange} />
            </div>
            <div className={classes.buttons_container}>
                <ButtonList
                    styles={{ containerClassName: classes.button_panel }}
                    items={[{
                        key: 'login_Sign_in',
                        className: classes.button,
                        children: `Sign in`,
                        disabled: !isValid,
                        handleClick: handleSubmit
                    },
                    {
                        key: 'login_Sign_Up',
                        className: classes.button,
                        children: `Sign up`,
                        handleClick: handleNavigateToSignUp
                    }]}
                />
            </div>
            {!!errors.length && errors.map(error => (<div>{error}</div>))}
        </Form>}
    </>
    );
}

export default LoginForm;