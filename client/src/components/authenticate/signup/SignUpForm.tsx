import { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router";
import { appConfig } from "../../../configuration";
import { httpService } from "../../../services";
import { validateEmail } from "../../../utils";
import { CameraRoll } from "../../cameraRoll";
import { Input, Button } from "../../shared";
import Form from "../../shared/form";
import classes from '../Auth.module.css';
interface SignUpFormProps {

}

interface SignUp { name: string, email: string; password: string; confirmPassword: string; avatar: string; uploadedImage: string }
const initialState = { email: '', password: '', confirmPassword: '', name: '', avatar: '', uploadedImage: '' }

const SignUpForm: FunctionComponent<SignUpFormProps> = () => {

    const [signUp, setSignUp] = useState<SignUp>(initialState);
    const [isValid, setIsValid] = useState<boolean>(false);
    const [takePhoto, setTakePhoto] = useState<boolean>(false);
    const [blob, setBlob] = useState<Blob>();
    const navigate = useNavigate();

    const onSuccess = (payload: any) => {
        setIsValid(false);
        setSignUp(initialState);
        localStorage.setItem('user', JSON.stringify(payload));
        navigate("/home");
    }
    const handleTakePhoto: any = async () => {
        setTakePhoto((prev) => !prev)
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
        const url = `${appConfig.serverUrl}${appConfig.signUpEndpoint}`;
        let formData = new FormData();
        for (let [key, val] of Object.entries(signUp)) {
            formData.append(key, JSON.stringify(val));
        }
        const fileType = blob?.type?.split('/')?.[1]
        const filename = `${Date.now()}.${fileType}`;
        const blobFile = new File([blob!], filename);
        formData.append('files', blobFile!);
        formData.append('fileName', filename);
        const res: any = await httpService.formData(url, formData);
        if (res.status === 200) {
            onSuccess(res.payload);
        }
    }

    return (<>
        <div className={classes.container}>
            <div>
                <h2 className={classes.header}>Sign Up!</h2>
                <hr className={classes.hr} />
            </div>
            <Input className={classes.input} handleChange={handleChange} placeholder='Email' type='email' name={'email'} value={signUp?.email} required />
            <Input className={classes.input} handleChange={handleChange} placeholder='Name' type='text' name={'name'} value={signUp?.name} required />
            <Input className={classes.input} handleChange={handleChange} placeholder='password' type='password' name='password' value={signUp?.password} required />
            <Input className={classes.input} handleChange={handleChange} placeholder='Confirm password' type='password' name='confirmPassword' value={signUp?.confirmPassword} required />
            {!takePhoto && <Input className={classes.input} handleChange={handleChange} placeholder='Upload Profile Image' type='file' name='uploadedImage' value={signUp?.uploadedImage} required />}
            {takePhoto && <div className={classes.camera_container}><CameraRoll onSave={(b) => {
                setBlob(b)
            }} /></div>}
            <Button className={classes.button} handleClick={handleTakePhoto}>{!takePhoto ? 'Take Photo' : 'Upload Image'}</Button>
            <Button className={classes.button} disabled={!isValid} handleClick={handleSubmit}>Submit</Button>
        </div>
    </>);
}

export default SignUpForm;