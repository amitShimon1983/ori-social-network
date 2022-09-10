import { FunctionComponent, useState } from "react";
import { useGetMessageThreads } from "../../hooks";
import { BackButton } from "../backButton";
import { Drawer, Fab, FaPencilAlt, Header, ImFilesEmpty, MessageForm, Spinner } from "../shared";
import InfiniteScroll from "../shared/infiniteScrolling/InfiniteScroll";
import classes from './Inbox.module.css';
const Inbox: FunctionComponent = () => {
    const [threads, setThreads] = useState<any[]>([])
    const [hasMore, setHasMore] = useState<boolean>(false);
    const [openMessageForm, setOpenMessageForm] = useState<boolean>(false);
    const { loading, error, fetchMore } = useGetMessageThreads((data: any) => {
        console.log({ data });
    });
    const renderItem = (item: any) => {
        console.log({ item });
        return <></>
    }
    const handleCommentFetch = async (skip: number) => {
        if (hasMore) {
            const data = await fetchMore({
                variables: {
                    skip
                }
            })
            console.log({ data });
        }
        return { items: [], hasMore: false }
    }
    const openMessageFormHandler = () => {
        debugger
        setOpenMessageForm(true)
    }
    const closeMessageFormHandler = () => {
        setOpenMessageForm(false)
    }
    return (<div className={classes.container}>
        <BackButton />
        <Header label={'Inbox'} />
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
            <MessageForm
                loading={false}
                handleSave={(data: any) => {

                }}
                fetchMore={(data) => {
                    return [{}]
                }} />
        </Drawer>
    </div>);
}

export default Inbox;