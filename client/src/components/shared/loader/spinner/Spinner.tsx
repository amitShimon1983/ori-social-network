import { FunctionComponent } from "react";

interface SpinnerProps {
    label?: string;
}

const Spinner: FunctionComponent<SpinnerProps> = ({ label }) => {
    return (<span>{label || 'Loading...'}</span>);
}

export default Spinner;