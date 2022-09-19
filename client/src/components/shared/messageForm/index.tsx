import { FunctionComponent, useCallback, useEffect, useState } from "react";
import AutoComplete from "../autoComplete";
import { InputButtonPanel } from "..";
import classes from './index.module.css';
import SpeechBubble from "../speechBubble";
import { useSearchContacts, useSendMessage } from "../../../hooks";
import MiniMe from "../../me/MiniMe";
import { Hr } from "../../styles";
import { debounce } from "@mui/material";
import { appContextVar } from "../../../services/store";
export interface MessageFormProps {
    conversation: { [key: string]: any }[];
    owners: { [key: string]: any }[];
    messageThreadId?: string;
    setConversation?: React.Dispatch<React.SetStateAction<any[]>>;
}
const MessageForm: FunctionComponent<MessageFormProps> = ({ messageThreadId, conversation, owners, setConversation }) => {
    const { user: me } = appContextVar();
    const defaultOwner = owners?.filter((owner: any) => (owner._id !== me._id));
    const [inputData, setInputData] = useState<string>();
    const [isValid, setIsValid] = useState<boolean>(false);
    const [selectedUsers, setSelectedUsers] = useState<any[]>();
    const [replyToId, setReplyToId] = useState<string>();
    const { searchContactsQuery, loading, error } = useSearchContacts();
    const { sendMessageMutation, loading: sendMessageLoading } = useSendMessage();
    const isFormValid = useCallback(() => {
        setIsValid(!!((selectedUsers?.length || owners?.filter((owner: any) => (owner._id !== me._id)).length) && inputData?.length))
    }, [selectedUsers, inputData, owners, me._id])
    useEffect(() => {
        isFormValid();
    }, [isFormValid])
    const handleInputChange = ({ target }: { target: any }) => {
        setInputData(target.value);
    }

    const handleMessageSave = async () => {
        let query = {
            variables: {
                content: inputData,
                recipient: selectedUsers?.[0]?._id ?? defaultOwner[0]._id,
                parentMessageId: replyToId,
                messageThreadId,
            }
        }
        if (isValid) {
            const { data } = await sendMessageMutation(query);
            setInputData(undefined)
            if (data?.sendMessage && typeof setConversation === 'function') {
                setConversation(data?.sendMessage);
            }
        }
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
    }, 600)

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
            defaultValue={defaultOwner}
            renderOption={renderOption}
            onSelectHandler={(data: any) => {
                setSelectedUsers(data);
                isFormValid();
            }}
            loading={loading}
            fetchData={fetchContactData}
        />
        <div className={classes.text_area}>
            {conversation.map(message => <SpeechBubble onClickHandler={() => setReplyToId(message._id)} key={`SpeechBubble_${message._id}_Message_Form`} userId={message.sender._id} content={message?.content} />)}
        </div>
        <InputButtonPanel
            disabled={!isValid}
            handleChange={handleInputChange}
            inputValue={inputData || ''}
            handleSave={handleMessageSave}
            placeholder={'Type message'} />
    </div>);
}

export default MessageForm;