import { gql } from "@apollo/client";
import { FunctionComponent, useState } from "react";
import { useGetMessageThreads } from "../../hooks";
import { appContextVar } from "../../services/store";
import { BackButton } from "../backButton";
import MiniMe from "../me/MiniMe";
import { Drawer, Fab, FaPencilAlt, Header, HiOutlinePhoneIncoming, HiOutlinePhoneOutgoing, ImFilesEmpty, MessageForm, Spinner } from "../shared";
import Card from "../shared/card/Card";
import InfiniteScroll from "../shared/infiniteScrolling/InfiniteScroll";
import { Hr } from "../styles";
import classes from './Inbox.module.css';

const Inbox: FunctionComponent = () => {
    const { user: me } = appContextVar();
    const [isActiveCall, setIsActiveCall] = useState<boolean>(false);
    const { threads, hasMore, loading, fetchMore, client } = useGetMessageThreads();
    const [threadOwners, setThreadOwners] = useState<any[]>([]);
    const [openMessageForm, setOpenMessageForm] = useState<boolean>(false);
    const [messageThreadId, setMessageThreadId] = useState<string>();
    const ownerNames = threadOwners.map((owner: any) => owner.name)
    const onItemClick = (data: any) => {
        if (client) {
            client.writeFragment({
                id: 'MessageThread:' + data._id.toString(),
                fragment: gql`
                        fragment MessageThreadFragment on MessageThread {
                            unreadMessages
                        }
                        `,
                data: {
                    unreadMessages: 0,
                },
            });
        }

    }
    const renderItem = (data: any) => {
        const message = data.messages[0];
        const tOwners = data.owners.filter((owner: any) => (owner._id !== me._id));
        return <div key={'render_list_item_thread_' + data._id} onClick={() => {
            setThreadOwners(tOwners || [])
            setOpenMessageForm(true);
            setMessageThreadId(data._id);
            onItemClick(data);
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
        if (messageThreadId) { onItemClick({ _id: messageThreadId }); }
        setOpenMessageForm(false);
        setMessageThreadId(undefined);
        setThreadOwners([])
        setIsActiveCall(false)
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
                <div className={classes.header_container}>
                    <div className={classes.mini_me}>
                        <MiniMe
                            displayEmailAddress={true}
                            user={threadOwners[0]}
                            displaySpinner={false}
                            navigateOnClick={false} />
                    </div>
                    <Fab
                        color="primary"
                        className={classes.phone_fab}
                        onClick={() => setIsActiveCall(prev => !prev)}>
                        <HiOutlinePhoneOutgoing />
                    </Fab>
                </div> : 'New Message'}
            dismissHandler={closeMessageFormHandler}
            isOpen={openMessageForm}>
            {openMessageForm && <MessageForm
                setIsActiveCall={() => setIsActiveCall(false)}
                calling={isActiveCall}
                setThreadOwners={setThreadOwners}
                owners={threadOwners}
                messageThreadId={messageThreadId} />}
        </Drawer>
    </div>);
}

export default Inbox;