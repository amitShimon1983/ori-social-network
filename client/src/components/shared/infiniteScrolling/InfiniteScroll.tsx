import { FunctionComponent, useCallback, useEffect, useRef, useState } from "react";
import { Spinner } from "../loader";
import classes from './InfiniteScroll.module.css';
interface InfiniteScrollProps {
    fetchMore: (skip: number) => Promise<{ items: any[], hasMore: boolean }>;
    initialData: any[];
    initialHasMore: boolean;
    renderItem: (item: any) => React.ReactNode;
    scrollTop?: () => void
    scrollTBottom?: () => void
}

const InfiniteScroll: FunctionComponent<InfiniteScrollProps> = ({ initialHasMore, fetchMore, initialData, renderItem }) => {
    const [listItems, setListItems] = useState<any[]>([]);
    const [loading, setLoading] = useState<Boolean>(false);
    const [hasMore, setHasMore] = useState<Boolean>(false);
    const observer = useRef<any>(null);
    const handleFetch = useCallback(async () => {
        setLoading(true)
        const { hasMore: externalHasMore, items } = await fetchMore(listItems?.length);
        setHasMore(externalHasMore)
        if (items.length) {
            setListItems(prev => {
                const newItems = [...prev, ...items]
                return newItems
            })
        }
        setLoading(false)
    }, [fetchMore, listItems?.length])
    const lastItemRef = useCallback((node: any) => {
        if (loading) {
            return;
        }

        if (observer.current) {
            observer.current.disconnect()
        }

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                if (!loading && hasMore) {
                    handleFetch();
                }
            }
        });

        if (node) {
            observer.current.observe(node)
        }
    }, [hasMore, loading, handleFetch])

    useEffect(() => {
        if (initialData.length) {
            setListItems(initialData);
            setHasMore(initialHasMore)
        }
    }, [initialData, initialHasMore])

    return (<div className={classes.container}>
        {!!listItems.length && listItems.map((item: any, idx: number) => {
            const isLast = idx === listItems.length - 1;
            return isLast ? <span ref={lastItemRef} key={item._id}>{renderItem(item)}</span> : renderItem(item);
        })}
        {loading && <Spinner label='loading' />}
    </div>);
}

export default InfiniteScroll;