import { FunctionComponent } from "react";

interface InputProps {
    handleChange: ({ target }: { target: any }) => void;
    type?: React.HTMLInputTypeAttribute | undefined;
    name?: string;
    className?: string;
    required?: boolean;
    placeholder?: string;
    value: any;
}

const Input: FunctionComponent<InputProps> = ({ handleChange, type, name, required, placeholder, value, className }) => {
    return (<>
        <input className={className} value={value} placeholder={placeholder} type={type} name={name} required={required} onChange={handleChange} />
    </>
    );
}

export default Input;