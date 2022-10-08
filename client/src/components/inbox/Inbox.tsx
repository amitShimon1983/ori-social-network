import { FunctionComponent, useEffect, useState } from "react";
import { useGetMessageThreads } from "../../hooks";
import { appContextVar } from "../../services/store";
import { BackButton } from "../backButton";
import MiniMe from "../me/MiniMe";
import { Drawer, Fab, FaPencilAlt, Header, ImFilesEmpty, MessageForm, Spinner } from "../shared";
import Card from "../shared/card/Card";
import InfiniteScroll from "../shared/infiniteScrolling/InfiniteScroll";
import { Hr } from "../styles";
import classes from './Inbox.module.css';
const Inbox: FunctionComponent = () => {
    const { user: me } = appContextVar();
    const [threads, setThreads] = useState<any[]>([]);
    const [threadOwners, setThreadOwners] = useState<any[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(false);
    const [openMessageForm, setOpenMessageForm] = useState<boolean>(false);
    const [messageThreadId, setMessageThreadId] = useState<string>();
    const ownerNames = threadOwners.map((owner: any) => owner.name)
    const { loading, fetchMore, subscribeToMore, NEW_MESSAGE_THREAD_SUBSCRIPTION, NEW_MESSAGE_SUBSCRIPTION } = useGetMessageThreads((data: any) => {
        setThreads((data?.getMessageThreads?.threads || []));
        setHasMore(data?.getMessageThreads?.hasMore);
    });
    useEffect(() => {
        subscribeToMore({
            document: NEW_MESSAGE_THREAD_SUBSCRIPTION,
            updateQuery: (prev: any, { subscriptionData }: { subscriptionData: any }) => {
                if (!subscriptionData?.data?.newMessageThread) return prev;
                const newData: any = {
                    ...prev,
                    getMessageThreads: {
                        ...prev.getMessageThreads,
                        threads: [subscriptionData.data.newMessageThread, ...(prev?.getMessageThreads?.threads || [])]
                    }

                };
                return newData
            }
        })
    }, []);
    useEffect(() => {
        subscribeToMore({
            document: NEW_MESSAGE_SUBSCRIPTION,
            updateQuery: (prev: any, { subscriptionData }: { subscriptionData: any }) => {
                if (!subscriptionData?.data?.newMessage) return prev;
                const newData: any = {
                    ...prev,
                    getMessageThreads: {
                        ...prev.getMessageThreads,
                        threads: prev?.getMessageThreads?.threads.map((thread: any) => {
                            debugger
                            if (thread._id === subscriptionData.data.newMessage._id) {
                                return subscriptionData.data.newMessage;
                            }
                            return thread
                        })
                    }

                };
                return newData
            }
        })
    }, []);

    const renderItem = (data: any) => {
        const message = data.messages[0];
        const tOwners = data.owners.filter((owner: any) => (owner._id !== me._id));
        return <div key={'render_list_item_thread_' + data._id} onClick={() => {
            setThreadOwners(tOwners || [])
            setOpenMessageForm(true);
            setMessageThreadId(data._id)
        }} className={classes.card_container}>
            <Card
                displayButtons={false}
                key={data._id + 'render_item_card_inbox'}
                content={message.content}
                user={tOwners[0]}
                createdAt={message.createdAt}
                navigateOnClick={false}
                counter={data.unreadMessages}
            />
            <Hr />
        </div>
    }
    const handleCommentFetch = async (skip: number) => {
        if (hasMore) {
            const data = await fetchMore({
                variables: {
                    skip
                },
            })
        }
        return { items: [], hasMore: false };
    }

    const openMessageFormHandler = () => {
        setOpenMessageForm(true);
    }
    const closeMessageFormHandler = () => {
        setOpenMessageForm(false);
        setMessageThreadId(undefined);
        setThreadOwners([])
    }

    return (<div className={classes.container}>
        <Header label={'Inbox'} ><BackButton /></Header>
        {!loading && !!threads?.length && <InfiniteScroll
            initialHasMore={hasMore}
            renderItem={renderItem}
            initialData={threads}
            fetchMore={handleCommentFetch} />}
        {!loading && !threads?.length &&
            <div className={classes.icon_container}>
                <ImFilesEmpty />
                <p className={classes.paragraph}>No messages</p>
            </div>}
        {loading && <Spinner label="Loading" />}
        <Fab onClick={openMessageFormHandler} className={`${classes.fab} ${!openMessageForm && classes.fab_show}`} color="secondary" aria-label="edit">
            <FaPencilAlt />
        </Fab>
        <Drawer
            headerStyles={{ container: classes.drawer_header_container, header: classes.drawer_header_header }}
            label={ownerNames.length ?
                <div className={classes.mini_me}>
                    <MiniMe
                        displayEmailAddress={true}
                        user={threadOwners[0]}
                        displaySpinner={false}
                        navigateOnClick={false} />
                </div> : 'New Message'}
            dismissHandler={closeMessageFormHandler}
            isOpen={openMessageForm}>
            {openMessageForm && <MessageForm setThreadOwners={setThreadOwners} owners={threadOwners} messageThreadId={messageThreadId} />}
        </Drawer>
    </div>);
}

export default Inbox;