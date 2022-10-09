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
import apolloQueries from "../../../queries";
export interface MessageFormProps {
    owners: { [key: string]: any }[];
    messageThreadId?: string;
    setThreadOwners: React.Dispatch<React.SetStateAction<any[]>>
}
const MessageForm: FunctionComponent<MessageFormProps> = ({ messageThreadId, owners, setThreadOwners }) => {
    const [messageThreadIdState, setMessageThreadId] = useState<string>();
    const [hasMore, setHasMore] = useState<boolean>(false);
    useEffect(() => {
        setMessageThreadId(messageThreadId)
    }, [messageThreadId])

    const [selectedUsers, setSelectedUsers] = useState<any[]>();
    const { searchContactsQuery, loading } = useSearchContacts();
    const { data, loading: getConversationLoading, subscribeToMore, fetchMore } = useGetConversation(messageThreadIdState, selectedUsers?.[0]?._id, ({ getConversation }) => {
        setHasMore(getConversation?.hasMore);
        if (!messageThreadIdState && getConversation.messages) {
            setMessageThreadId(getConversation.messages[0].messageThreadId)
        }
    });
    useEffect(() => {
        subscribeToMore({
            document: apolloQueries.inboxQueries.NEW_MESSAGE_SUBSCRIPTION,
            updateQuery: (prev: any, { subscriptionData }: { subscriptionData: any }) => {
                const newMessage = subscriptionData?.data?.newMessage?.messages?.[0];
                if (!newMessage) return prev;
                // const newData = { ...prev, getConversation: { ...prev.getConversation, messages: [...prev.getConversation.messages, newMessage] } };
                // console.log({ newData, prev });
                return prev
            }
        })
    }, []);
    const [inputData, setInputData] = useState<string>();
    const [isValid, setIsValid] = useState<boolean>(false);
    const [displayCamera, setDisplayCamera] = useState<boolean>(false);
    const [replyTo, setReplyTo] = useState<any>();
    const { sendMessageMutation, } = useSendMessage();
    const isFormValid = useCallback(() => {
        setIsValid(!!((selectedUsers?.length || owners?.length) && inputData?.length))
    }, [selectedUsers, inputData, owners])
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
                recipient: selectedUsers?.[0]?._id ?? owners[0]._id,
                parentMessageId: replyTo?._id,
                messageThreadId: messageThreadId ?? messageThreadIdState,
                type: 'text'
            }
        }
        if (isValid) {
            const { data: { sendMessage } } = await sendMessageMutation(query);
            if (!messageThreadId && sendMessage?.messageThreadId) {
                setMessageThreadId(sendMessage.messageThreadId);
                setThreadOwners([sendMessage.recipient]);
            }
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
        setInputData(undefined);
        setReplyTo(undefined);
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
    const onVideoSave = (blob: Blob) => {
        handleRecorderSave(blob, 'video');
        setDisplayCamera(false)
    }
    const messages = data?.getConversation?.messages;
    const handleReplyCardDismiss = (e: any) => { e.stopPropagation(); setReplyTo(undefined); }
    const onSelectHandler = (data: any) => {
        setSelectedUsers(data);
        setThreadOwners(data);
        isFormValid();
    };
    const onItemClick: (item: any) => void | Promise<void> = (item) => {
        setReplyTo(item);
    };
    const fetchMoreMessages = async (skip: number) => {
        await fetchMore({
            variables: {

            }
        })
        return { items: [], hasMore: false }
    }
    return (<div className={classes.container}>
        {!owners.length && <AutoComplete
            defaultValue={owners}
            renderOption={renderOption}
            onSelectHandler={onSelectHandler}
            loading={loading}
            fetchData={fetchContactData}
        />}
        {displayCamera && <CameraRoll onSave={onVideoSave} />}
        {!getConversationLoading && <div style={{ position: 'relative', height: '95%' }}>
            <SpeechBubbleList
                fetchMore={fetchMoreMessages}
                hasMore={hasMore}
                items={messages}
                onItemClick={onItemClick} />
            <ReplyCard display={!!replyTo} creator={replyTo?.sender} content={replyTo?.content} handleDismiss={handleReplyCardDismiss} />
        </div>}
        {getConversationLoading && <Spinner />}
        <InputButtonPanel
            toggleCamera={() => setDisplayCamera(prev => (!prev))}
            isCameraOpen={displayCamera}
            disabled={!isValid}
            handleChange={handleInputChange}
            inputValue={inputData || ''}
            handleSave={handleMessageSave}
            handleRecorderSave={handleRecorderSave}
            placeholder={'Type a message'} />
    </div>);
}

export default MessageForm;