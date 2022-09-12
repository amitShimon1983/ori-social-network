import { FunctionComponent, useState } from "react";
import { useGetMessageThreads } from "../../hooks";
import { BackButton } from "../backButton";
import { Drawer, Fab, FaPencilAlt, Header, ImFilesEmpty, MessageForm, Spinner } from "../shared";
import Card from "../shared/card/Card";
import InfiniteScroll from "../shared/infiniteScrolling/InfiniteScroll";
import { Hr } from "../styles";
import classes from './Inbox.module.css';
const Inbox: FunctionComponent = () => {
    const [threads, setThreads] = useState<any[]>([])
    const [hasMore, setHasMore] = useState<boolean>(false);
    const [openMessageForm, setOpenMessageForm] = useState<boolean>(false);
    const { loading, error, fetchMore } = useGetMessageThreads((data: any) => {
        setThreads((data?.getMessageThreads?.threads || []))
        setHasMore(data?.getMessageThreads?.hasMore)
    });
    const renderItem = (data: any) => {
        return <div style={{ width: '95%', padding: '10px' }}>
            <Card
                displayButtons={false}
                key={data._id}
                _id={data._id}
                content={data.content}
                user={data.recipient}
                createdAt={data.createdAt} />
            <Hr />
        </div>
    }
    const handleCommentFetch = async (skip: number) => {
        if (hasMore) {
            const data = await fetchMore({
                variables: {
                    skip
                }
            })
        }
        return { items: [], hasMore: false }
    }
    const openMessageFormHandler = () => {
        setOpenMessageForm(true)
    }
    const closeMessageFormHandler = () => {
        setOpenMessageForm(false)
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
        <Drawer label={'New Message'} dismissHandler={closeMessageFormHandler} isOpen={openMessageForm}>
            <MessageForm />
        </Drawer>
    </div>);
}

export default Inbox;