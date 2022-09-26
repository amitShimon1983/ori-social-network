import { FunctionComponent, useState } from "react";
import { useGetMessageThreads } from "../../hooks";
import { appContextVar } from "../../services/store";
import { BackButton } from "../backButton";
import { Drawer, Fab, FaPencilAlt, Header, ImFilesEmpty, MessageForm, Spinner } from "../shared";
import Card from "../shared/card/Card";
import InfiniteScroll from "../shared/infiniteScrolling/InfiniteScroll";
import { Hr } from "../styles";
import classes from './Inbox.module.css';
const Inbox: FunctionComponent = () => {
    const { user: me } = appContextVar();
    const [threads, setThreads] = useState<any[]>([]);
    const [threadsOwner, setThreadOwners] = useState<any[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(false);
    const [openMessageForm, setOpenMessageForm] = useState<boolean>(false);
    const [messageThreadId, setMessageThreadId] = useState<string>();
    const owners: any = threadsOwner?.filter((owner: any) => (owner._id !== me._id));
    const ownerNames = owners.map((owner: any) => owner.name)
    const { loading, fetchMore } = useGetMessageThreads((data: any) => {
        setThreads((data?.getMessageThreads?.threads || []));
        setHasMore(data?.getMessageThreads?.hasMore);
    });
    const renderItem = (data: any) => {
        const message = data.messages[0];
        return <div key={'render_list_item_thread_' + data._id} onClick={() => {
            setThreadOwners(data.owners || [])
            setOpenMessageForm(true);
            setMessageThreadId(data._id)
        }} style={{ width: '95%', padding: '10px' }}>
            <Card
                displayButtons={false}
                key={message._id + 'render_item_card_inbox'}
                content={message.content}
                user={message.sender}
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
        <Drawer label={ownerNames.length ? ownerNames.join(',') : 'New Message'} dismissHandler={closeMessageFormHandler} isOpen={openMessageForm}>
            {openMessageForm && <MessageForm owners={owners} messageThreadId={messageThreadId} />}
        </Drawer>
    </div>);
}

export default Inbox;