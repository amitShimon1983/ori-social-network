import { FunctionComponent } from "react";
import AutoComplete from "../autoComplete";

interface SendMessageProps {
    loading: boolean;
    fetchMore: (value: any) => any[] | Promise<any[]>
}

const SendMessage: FunctionComponent<SendMessageProps> = ({ loading, fetchMore }) => {

    return (<div>
        <AutoComplete loading={loading} fetchMore={fetchMore} />
    </div>);
}

export default SendMessage;