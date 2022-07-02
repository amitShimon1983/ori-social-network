import { FunctionComponent, useState } from "react";
import { Input } from "../../shared";
import Button from "../../shared/button/Button";

interface SignUpFormProps {

}
interface signUp { email: string; password: string; confirmPassword: string; }
const initialState = { email: '', password: '', confirmPassword: '' }
const SignUpForm: FunctionComponent<SignUpFormProps> = () => {
    const [signUp, setSignUp] = useState<signUp>(initialState)
    const [isValid, setIsValid] = useState<boolean>(false)
    const handleChange = ({ target }: { target: any }) => {
        console.log(target?.name);
        console.log(target?.value);
        setSignUp((prev) => ({ ...prev, [target?.name]: target?.value }))
    }
    const handleSubmit = (event: any) => {
        event.preventDefault();
        //logic
        setSignUp(initialState)
    }
    return (<>
        <form>
            <Input handleChange={handleChange} placeholder='Email' type='email' name={'email'} value={signUp?.email} required />
            <Input handleChange={handleChange} placeholder='password' type='password' name='password' value={signUp?.password} required />
            <Input handleChange={handleChange} placeholder='Confirm password' type='password' name='confirmPassword' value={signUp?.confirmPassword} required />
            <Button disabled={!isValid} handleClick={handleSubmit}>Submit</Button>
        </form>
    </>);
}

export default SignUpForm;