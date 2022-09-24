import { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router";
import { appConfig } from "../../../configuration";
import { httpService } from "../../../services";
import { validateEmail } from "../../../utils";
import { CameraRoll } from "../../cameraRoll";
import { Input, ButtonList, DatePicker, Header } from "../../shared";
import { Hr } from "../../styles/styles";
import classes from '../Auth.module.css';

interface SignUpFormProps {

}

interface SignUp { name: string, email: string; password: string; confirmPassword: string; uploadedImage: string; dateOfBirth?: Date; }
const initialState = { email: '', password: '', confirmPassword: '', name: '', uploadedImage: '', dateOfBirth: undefined }

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
    const handleDateChange: (value: any) => void | Promise<void> = (value) => {
        const target = { name: 'dateOfBirth', value };
        // const today = new Date();
        // const age = today.getFullYear() - value.getFullYear();
        // if (age > 18) {
        //     handleChange({ target });
        // } else {
        //     // display age error
        // }
        handleChange({ target });
    };
    return (<>
        <div className={classes.sign_up_header}>
            <Header label={'Sign Up!'} />
        </div>
        <div className={classes.container}>
            <Input styles={{ input: classes.input }} handleChange={handleChange} label='Email' type='email' name={'email'} value={signUp?.email} required />
            <Input styles={{ input: classes.input }} handleChange={handleChange} label='Name' type='text' name={'name'} value={signUp?.name} required />
            <Input styles={{ input: classes.input }} handleChange={handleChange} label='password' type='password' name='password' value={signUp?.password} required />
            <Input styles={{ input: classes.input }} handleChange={handleChange} label='Confirm password' type='password' name='confirmPassword' value={signUp?.confirmPassword} required />
            <DatePicker handlePickerChange={handleDateChange}
            />
            {!takePhoto && <Input styles={{ input: classes.input }} handleChange={handleChange} type='file' name='uploadedImage' value={signUp?.uploadedImage} required />}
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