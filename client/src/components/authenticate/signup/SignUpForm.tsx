import { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router";
import { appConfig } from "../../../configuration";
import { httpService } from "../../../services";
import { validateEmail } from "../../../utils";
import { CameraRoll } from "../../cameraRoll";
import { Input, Button, ButtonList } from "../../shared";
import { Hr } from "../../styles/styles";
import classes from '../Auth.module.css';
interface SignUpFormProps {

}

interface SignUp { name: string, email: string; password: string; confirmPassword: string; uploadedImage: string }
const initialState = { email: '', password: '', confirmPassword: '', name: '', uploadedImage: '' }

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
    const handleTakePhoto = async () => {
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
            formData.append(key, val);
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
    const handleNavigateToSignIn = () => {
        navigate(`/login`)
    };
    return (<>
        <div className={classes.sign_up_header}>
            <h2 className={classes.header}>Sign Up!</h2>
            <Hr />
        </div>
        <div className={classes.container}>
            <Input className={classes.input} handleChange={handleChange} placeholder='Email' type='email' name={'email'} value={signUp?.email} required />
            <Input className={classes.input} handleChange={handleChange} placeholder='Name' type='text' name={'name'} value={signUp?.name} required />
            <Input className={classes.input} handleChange={handleChange} placeholder='password' type='password' name='password' value={signUp?.password} required />
            <Input className={classes.input} handleChange={handleChange} placeholder='Confirm password' type='password' name='confirmPassword' value={signUp?.confirmPassword} required />
            {!takePhoto && <Input className={classes.input} handleChange={handleChange} placeholder='' type='file' name='uploadedImage' value={signUp?.uploadedImage} required />}
            {takePhoto && <div className={classes.camera_container}><CameraRoll onSave={(b) => {
                setBlob(b)
            }} /></div>}
            <ButtonList
                styles={{ containerClassName: classes.sign_up_buttons_panel }}
                items={[
                    {
                        className: classes.button,
                        handleClick: handleTakePhoto,
                        children: !takePhoto ? 'Take Photo' : 'Upload Image',
                        key: !takePhoto ? 'Take Photo' : 'Upload Image'
                    },
                    {
                        className: classes.button,
                        handleClick: handleNavigateToSignIn,
                        children: 'Sign in',
                        key: 'Sign_in_form'
                    },
                    {
                        className: classes.button,
                        handleClick: handleSubmit,
                        disabled: !isValid,
                        children: 'Submit',
                        key: 'Submit_sign_in'
                    }
                ]}
            />
        </div>
    </>);
}

export default SignUpForm;