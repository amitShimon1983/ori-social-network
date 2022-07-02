import { FunctionComponent } from "react";

interface InputProps {
    handleChange: ({ target }: { target: any }) => void;
    type?: React.HTMLInputTypeAttribute | undefined;
    name?: string;
    required?: boolean;
    placeholder?: string;
    value: any;
}

const Input: FunctionComponent<InputProps> = ({ handleChange, type, name, required, placeholder, value }) => {
    return (<>
        <input value={value} placeholder={placeholder} type={type} name={name} required={required} onChange={handleChange} />
    </>
    );
}

export default Input;