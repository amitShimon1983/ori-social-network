import { FunctionComponent, useState } from "react";
import AutoComplete from "../autoComplete";
import { InputButtonPanel } from "..";
import classes from './index.module.css';
import SpeechBubble from "../speechBubble";
import { useSearchContacts } from "../../../hooks";
import MiniMe from "../../me/MiniMe";
import { Hr } from "../../styles";
import { debounce } from "@mui/material";

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
    const fetchContactData = debounce(async (value: any, setOptions: React.Dispatch<React.SetStateAction<any[]>>) => {
        if (!value || value.length < 2) {
            return [];
        }
        const res = await searchContactsQuery({
            variables: {
                queryString: value
            }
        })
        const options: any[] = res.data.searchContacts || []
        setOptions(options)
        return options;
    }, 300)

    const renderOption = (props: object, option: any, state: object): React.ReactNode => {
        return (<li {...props}>
            <div key={'mini_me_' + option._id + 'message_form'} className={classes.me_container}>
                <MiniMe navigateOnClick={false} user={option} displaySpinner={false} />
            </div>
            <Hr />
        </li>
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