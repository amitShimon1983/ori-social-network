import { FunctionComponent, useState } from "react";
import AutoComplete from "../autoComplete";
import { InputButtonPanel } from "..";
import classes from './index.module.css';
import SpeechBubble from "../speechBubble";
import { useSearchContacts } from "../../../hooks";
import debounce from "lodash.debounce";
import Me from "../../me";
import MiniMe from "../../me/MiniMe";

const MessageForm: FunctionComponent = () => {
    const [inputData, setInputData] = useState<string>();
    const [selectedUsers, setSelectedUsers] = useState<any[]>();
    const { searchContactsQuery, loading, error } = useSearchContacts();
    const handleInputChange = ({ target }: { target: any }) => {
        setInputData(target.value)
    }
    const handleMessageSave = async () => {
        // handleSave({ inputData, selectedUsers })
    }
    const fetchContactData = async (value: any) => {
        if (!value || value.length < 2) {
            return [];
        }
        const res = await searchContactsQuery({
            variables: {
                queryString: value
            }
        })
        return res.data.searchContacts || [];
    }
    const renderOption = (props: object, option: any, state: object): React.ReactNode => {
        return (
            <MiniMe navigateOnClick={false} user={option} displaySpinner={false} />
        );
    };
    return (<div className={classes.container}>
        <AutoComplete
            renderOption={renderOption}
            onSelectHandler={(data: any) => {
                console.log('onSelectHandler', data);
                setSelectedUsers(data);
            }}
            loading={loading}
            fetchData={fetchContactData}
        />
        <div className={classes.text_area}>
            {inputData && <SpeechBubble fromMe={true} content={inputData} />}
            {inputData && <SpeechBubble fromMe={false} content={inputData} />}

        </div>
        <InputButtonPanel
            handleChange={handleInputChange}
            inputValue={inputData || ''}
            handleSave={handleMessageSave}
            placeholder={'Type message'} />
    </div>);
}

export default MessageForm;