import { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router";
import { appConfig } from "../../../configuration";
import { httpService } from "../../../services";
import { validateEmail } from "../../../utils";
import { Input, Button } from "../../shared";

interface SignUpFormProps {

}

interface SignUp { name: string, email: string; password: string; confirmPassword: string; avatar: string; }
const initialState = { email: '', password: '', confirmPassword: '', name: '', avatar: '' }

const SignUpForm: FunctionComponent<SignUpFormProps> = () => {

    const [signUp, setSignUp] = useState<SignUp>(initialState)
    const [isValid, setIsValid] = useState<boolean>(false)
    const navigate = useNavigate();

    const onSuccess = (payload: any) => {
        setIsValid(false);
        setSignUp(initialState);
        //set user
        localStorage.setItem('i', JSON.stringify(payload));
        navigate("/home");
    }

    const handleChange = ({ target }: { target: any }) => {
        setSignUp((prev) => {
            const newState = { ...prev, [target?.name]: target?.value };
            if ((newState.confirmPassword && newState.password && newState.confirmPassword === newState.password)
                && (newState.email && validateEmail(newState.email))
                && newState.name) {
                setIsValid(true);
            } else {
                setIsValid(false);
            }
            return (newState)
        })
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const url = `${appConfig.serverUrl}${appConfig.signUpEndpoint}`
        const res: any = await httpService.post(url, JSON.stringify(signUp));
        if (res.status === 200) {
            onSuccess(res.payload);
        }
    }

    return (<>
        <form>
            <Input handleChange={handleChange} placeholder='Email' type='email' name={'email'} value={signUp?.email} required />
            <Input handleChange={handleChange} placeholder='Name' type='text' name={'name'} value={signUp?.name} required />
            <Input handleChange={handleChange} placeholder='password' type='password' name='password' value={signUp?.password} required />
            <Input handleChange={handleChange} placeholder='Confirm password' type='password' name='confirmPassword' value={signUp?.confirmPassword} required />
            <Button disabled={!isValid} handleClick={handleSubmit}>Submit</Button>
        </form>
    </>);
}

export default SignUpForm;