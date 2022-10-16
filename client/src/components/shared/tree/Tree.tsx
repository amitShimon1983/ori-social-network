import React, { FunctionComponent, useEffect, useState } from "react";
import { Hr } from "../../styles";
import classes from "./Tree.module.css";
interface TreeNodeProps {
    node: { _id: string; content: any; createdAt: string; user?: string; };
    fetchMore: (data: any, skip: number) => any;
    styles: { treeClassName?: string; treeNodeClassName?: string; };
    renderItem: (data: any) => React.ReactNode;
    setReplyTo: React.Dispatch<React.SetStateAction<{
        data?: any;
        setChild?: React.Dispatch<React.SetStateAction<any[]>> | undefined;
    } | undefined>>
    hasMore: (data: any) => boolean;

}

interface TreeProps {
    data: any[];
    hasMore: (data: any) => boolean;
    renderItem: (data: any) => React.ReactNode;
    fetchMore: (data: any, skip: number) => any;
    styles: { treeClassName?: string; treeNodeClassName?: string; };
    setReplyTo: React.Dispatch<React.SetStateAction<{
        data?: any;
        setChild?: React.Dispatch<React.SetStateAction<any[]>> | undefined;
    } | undefined>>
}

const Tree: FunctionComponent<TreeProps> = ({ hasMore, data = [], fetchMore, styles, renderItem, setReplyTo }) => {
    return (
        <div className={` ${styles.treeClassName}`}>
            {data?.map((tree) => (<div key={tree._id + 'treeNode_main'}>
                <TreeNode hasMore={hasMore} setReplyTo={setReplyTo} renderItem={renderItem} styles={styles} fetchMore={fetchMore} key={tree._id + 'treeNode'} node={tree} />
            </div>)
            )}
        </div>
    );
}
export default React.memo(Tree);

export const TreeNode: FunctionComponent<TreeNodeProps> = ({ hasMore, setReplyTo, styles, node, fetchMore, renderItem }) => {
    const [isChildVisible, setChildVisibility] = useState(false);
    const [treeNode, setTreeNode] = useState<any>();
    const [child, setChild] = useState<any[]>([]);
    const [skip, setSkip] = useState<number>(0);
    const [hasMoreChild, setHasMoreChild] = useState<boolean>(true);
    useEffect(() => {
        if (node) {
            setTreeNode(node)
        }
    }, [node])
    const handleDataAdded = async (data: any) => {
        setChild((prev: any[]) => {
            const newComments = [...prev];
            newComments.push(...data);
            return newComments;
        })
        setTreeNode((prev: any) => ({
            ...prev,
            comments: [...(prev?.comments || []), ...data]
        }))
        setChildVisibility(true)
    }


    const handleFetch = async (event: any) => {
        event.stopPropagation();
        if (!isChildVisible) {
            if (hasMoreChild) {
                const childNode = await fetchMore(treeNode, skip);
                setHasMoreChild(!!childNode.length)
                setSkip(childNode.length)
                await handleDataAdded(childNode);
            }
            setChildVisibility(true)
        } else {
            setChildVisibility(false)
        }
    }

    return (<>
        <div className={`${classes.node_container} ${styles.treeNodeClassName}`}>
            {!!treeNode && renderItem(treeNode)}
            {!!treeNode && (<div className={classes.node_links}>
                {!!treeNode && hasMore(treeNode) && <div className={`${classes.node_link} ${isChildVisible && classes.node_link_active}`} onClick={handleFetch}>
                    {isChildVisible ? 'See less' : 'See more '}
                </div>}
                <div onClick={(event) => {
                    event.stopPropagation();
                    setReplyTo({ data: treeNode, setChild: handleDataAdded });
                }}>Reply</div>
            </div>
            )}
            <Hr />
        </div>
        {!!treeNode && <div className={`${!isChildVisible && classes.node_child_hide} ${classes.node_child}`}>
            <Tree hasMore={hasMore} setReplyTo={setReplyTo} renderItem={renderItem} styles={styles} fetchMore={fetchMore} key={node._id + 'tree'} data={child} />
        </div>}
    </>);
}
