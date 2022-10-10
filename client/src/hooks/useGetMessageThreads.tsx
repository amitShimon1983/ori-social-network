import { useQuery } from "@apollo/client"
import { useEffect, useState } from "react";
import apolloQueries from "../queries"

export function useGetMessageThreads(onCompleted?: (data: any) => void | Promise<void>) {
    const [threads, setThreads] = useState<any[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(false);
    const { loading, fetchMore, subscribeToMore, client } = useQuery(apolloQueries.inboxQueries.GET_MESSAGE_THREADS, {
        onCompleted: (data: any) => {
            setThreads((data?.getMessageThreads?.threads || []));
            setHasMore(data?.getMessageThreads?.hasMore);
            if (typeof onCompleted === 'function') {
                onCompleted(data);
            }
        },
    })

    useEffect(() => {
        subscribeToMore({
            document: apolloQueries.inboxQueries.NEW_MESSAGE_THREAD_SUBSCRIPTION,
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
            document: apolloQueries.inboxQueries.NEW_MESSAGE_SUBSCRIPTION,
            updateQuery: (prev: any, { subscriptionData }: { subscriptionData: any }) => {
                if (!subscriptionData?.data?.newMessage) return prev;
                const restThreads = prev?.getMessageThreads?.threads.filter((thread: any) => {
                    return thread._id !== subscriptionData.data.newMessage._id
                });
                const oldThread = prev?.getMessageThreads?.threads.find((thread: any) => {
                    return thread._id === subscriptionData.data.newMessage._id
                });
                const newThread = {
                    ...subscriptionData.data.newMessage,
                    unreadMessages: oldThread.unreadMessages + 1
                }
                const newData: any = {
                    ...prev,
                    getMessageThreads: {
                        ...prev.getMessageThreads,
                        threads: [newThread, ...restThreads]
                    }

                };
                return newData
            }
        })
    }, []);
    return { threads, hasMore, loading, fetchMore, client }
}
