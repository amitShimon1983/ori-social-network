import { FunctionComponent, useCallback, useEffect, useRef, useState } from "react";
import AutoComplete from "../autoComplete";
import { InputButtonPanel, Spinner } from "..";
import classes from './index.module.css';
import SpeechBubble from "../speechBubble";
import { useGetConversation, useSearchContacts, useSendMessage } from "../../../hooks";
import MiniMe from "../../me/MiniMe";
import { Hr } from "../../styles";
import { debounce } from "@mui/material";
import { appContextVar } from "../../../services/store";
export interface MessageFormProps {
    owners: { [key: string]: any }[];
    messageThreadId?: string;
}
const MessageForm: FunctionComponent<MessageFormProps> = ({ messageThreadId, owners }) => {
    const { data, loading: getConversationLoading } = useGetConversation(messageThreadId);
    let ref = useRef<HTMLElement>()
    const onRefChange = useCallback((node: any) => {
        if (node) {
            ref.current = node;
            console.log('onRefChange', node);
            console.log('data.getConversation.length');
            ref?.current?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' });
        }
    }, []);
    useEffect(() => {
        if (ref?.current) {
            console.log('ref.current', ref.current);
            ref?.current?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' });
        }
    }, [data?.getConversation?.messages?.length])

    const { user: me } = appContextVar();
    const defaultOwner = owners?.filter((owner: any) => (owner._id !== me._id));
    const [inputData, setInputData] = useState<string>();
    const [isValid, setIsValid] = useState<boolean>(false);
    const [selectedUsers, setSelectedUsers] = useState<any[]>();
    const [replyToId, setReplyToId] = useState<string>();
    const { searchContactsQuery, loading } = useSearchContacts();
    const { sendMessageMutation, } = useSendMessage();
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
            await sendMessageMutation(query);
            setInputData(undefined);
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
    const messages = data?.getConversation?.messages;
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
            {!getConversationLoading && messages?.map((message: any, idx: number) => {
                const isLast = idx === messages?.length - 1;
                return <span id={idx + ''} style={{ padding: 16 }} key={`SpeechBubble_${message._id}_Message_Form_ref`}
                    ref={isLast ? onRefChange : undefined}>
                    <SpeechBubble
                        onClickHandler={() => setReplyToId(message._id)}
                        key={`SpeechBubble_${message._id}_Message_Form`}
                        userId={message.sender._id}
                        content={message?.content} />
                </span>
            })}
            {getConversationLoading && <Spinner />}
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