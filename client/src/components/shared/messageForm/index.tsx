import { FunctionComponent, useCallback, useEffect, useRef, useState } from "react";
import AutoComplete from "../autoComplete";
import { InputButtonPanel, Spinner } from "..";
import classes from './index.module.css';
import { useGetConversation, useSearchContacts, useSendMessage } from "../../../hooks";
import MiniMe from "../../me/MiniMe";
import { Hr } from "../../styles";
import { debounce } from "@mui/material";
import { ReplyCard, SpeechBubbleList } from "..";
import { appConfig } from "../../../configuration";
import { cameraService } from "../../../services";
import { CameraRoll } from "../../cameraRoll";
export interface MessageFormProps {
    owners: { [key: string]: any }[];
    messageThreadId?: string;
}
const MessageForm: FunctionComponent<MessageFormProps> = ({ messageThreadId, owners }) => {
    const { data, loading: getConversationLoading } = useGetConversation(messageThreadId);
    let ref = useRef<HTMLSpanElement>(null);
    const [inputData, setInputData] = useState<string>();
    const [isValid, setIsValid] = useState<boolean>(false);
    const [displayCamera, setDisplayCamera] = useState<boolean>(false);
    const [selectedUsers, setSelectedUsers] = useState<any[]>();
    const [replyTo, setReplyTo] = useState<any>();
    const { searchContactsQuery, loading } = useSearchContacts();
    const { sendMessageMutation, } = useSendMessage();
    const isFormValid = useCallback(() => {
        setIsValid(!!((selectedUsers?.length || owners?.length) && inputData?.length))
    }, [selectedUsers, inputData, owners])
    useEffect(() => {
        isFormValid();
    }, [isFormValid])
    useEffect(() => {
        setTimeout(() => {
            ref?.current?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' });
        }, 100)
    }, [data?.getConversation.messages?.length])
    const handleInputChange = ({ target }: { target: any }) => {
        setInputData(target.value);
    }

    const handleMessageSave = async () => {
        let query = {
            variables: {
                content: inputData,
                recipient: selectedUsers?.[0]?._id ?? owners[0]._id,
                parentMessageId: replyTo?._id,
                messageThreadId,
                type: 'text'
            }
        }
        if (isValid) {
            await sendMessageMutation(query);
            setInputData(undefined);
            setReplyTo(undefined);
        }
    }
    const handleRecorderSave = async (blob: any, type: string) => {
        const url = `${appConfig.serverUrl}${appConfig.uploadMessageEndpoint}`;
        await cameraService.saveFile(url, blob, undefined, undefined, {
            content: inputData,
            recipient: selectedUsers?.[0]?._id ?? owners[0]._id,
            parentMessageId: replyTo?._id,
            messageThreadId,
            type,
        });
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
                <MiniMe displayEmailAddress={true} navigateOnClick={false} user={option} displaySpinner={false} />
            </div>
            <Hr />
        </li>
        );
    };
    const messages = data?.getConversation?.messages;
    const handleReplyCardDismiss = (e: any) => { e.stopPropagation(); setReplyTo(undefined); }
    return (<div className={classes.container}>
        {displayCamera && <CameraRoll onSave={(b) => {
            handleRecorderSave(b, 'video')
        }} />}
        {!owners.length && <AutoComplete
            defaultValue={owners}
            renderOption={renderOption}
            onSelectHandler={(data: any) => {
                setSelectedUsers(data);
                isFormValid();
            }}
            loading={loading}
            fetchData={fetchContactData}
        />}
        <div className={classes.text_area}>
            {!getConversationLoading && <>
                <SpeechBubbleList
                    ref={ref}
                    items={messages}
                    onItemClick={(item) => {
                        setReplyTo(item);
                    }} />
                <ReplyCard display={!!replyTo} creator={replyTo?.sender} content={replyTo?.content} handleDismiss={handleReplyCardDismiss} />
            </>
            }
            {getConversationLoading && <Spinner />}
        </div>
        <InputButtonPanel
            handleDisplayCamera={() => setDisplayCamera(prev => (!prev))}
            disabled={!isValid}
            handleChange={handleInputChange}
            inputValue={inputData || ''}
            handleSave={handleMessageSave}
            handleRecorderSave={handleRecorderSave}
            placeholder={'Type a message'} />
    </div>);
}

export default MessageForm;