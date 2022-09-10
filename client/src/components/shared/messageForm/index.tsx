import { FunctionComponent, useState } from "react";
import AutoComplete from "../autoComplete";
import { InputButtonPanel } from "..";
interface MessageFormProps {
    loading: boolean;
    fetchMore: (value: any) => any[] | Promise<any[]>
    handleSave: (data: any) => Promise<void> | void
}

const MessageForm: FunctionComponent<MessageFormProps> = ({ loading, fetchMore, handleSave }) => {
    const [inputData, setInputData] = useState<string>();
    const [selectedUsers, setSelectedUsers] = useState<any[]>();
    const handleInputChange = ({ target }: { target: any }) => {
        setInputData(target.value)
    }
    const handleMessageSave = async () => {
        handleSave({ inputData, selectedUsers })
    }
    return (<div>
        <AutoComplete
            onSelectHandler={(data: any) => {
                console.log(data);
                setSelectedUsers(data)
            }}
            loading={loading}
            fetchMore={fetchMore}
        />
        <div>
            {inputData}
        </div>
        <InputButtonPanel
            handleChange={handleInputChange}
            inputValue={inputData || ''}
            handleSave={handleMessageSave}
            placeholder={'Type message'} />
    </div>);
}

export default MessageForm;