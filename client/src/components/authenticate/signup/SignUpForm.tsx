import { FunctionComponent, useState } from "react";
import { isTemplateTail } from "typescript";
import { validateEmail } from "../../../utils";
import { Input } from "../../shared";
import Button from "../../shared/button/Button";

interface SignUpFormProps {

}
interface signUp { name: string, email: string; password: string; confirmPassword: string; avatar: string; }
const initialState = { email: '', password: '', confirmPassword: '', name: '', avatar: '' }
const SignUpForm: FunctionComponent<SignUpFormProps> = () => {

    const [signUp, setSignUp] = useState<signUp>(initialState)
    const [isValid, setIsValid] = useState<boolean>(false)

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

    const handleSubmit = (event: any) => {
        event.preventDefault();
        //send to server
        setSignUp(initialState)
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