import React, { FunctionComponent, useState } from "react";
import classes from "./Tree.module.css";
interface TreeNodeProps {
    node: { _id: string; content: any; createdAt: string; user?: string; };
    fetchMore: (data: any) => any;
    styles: { treeClassName?: string; treeNodeClassName?: string; };
    renderItem: (data: any) => React.ReactNode;
    setReplyTo: React.Dispatch<React.SetStateAction<{
        data?: any;
        setChild?: React.Dispatch<React.SetStateAction<any[]>> | undefined;
    } | undefined>>

}

interface TreeProps {
    data: any[];
    renderItem: (data: any) => React.ReactNode;
    fetchMore: (data: any) => any;
    styles: { treeClassName?: string; treeNodeClassName?: string; };
    setReplyTo: React.Dispatch<React.SetStateAction<{
        data?: any;
        setChild?: React.Dispatch<React.SetStateAction<any[]>> | undefined;
    } | undefined>>
}

const Tree: FunctionComponent<TreeProps> = ({ data = [], fetchMore, styles, renderItem, setReplyTo }) => {
    return (
        <div className={` ${styles.treeClassName}`}>
            {data?.map((tree) => (<div className={classes.node_child}>
                <TreeNode setReplyTo={setReplyTo} renderItem={renderItem} styles={styles} fetchMore={fetchMore} key={tree._id + 'treeNode'} node={tree} />
            </div>)
            )}
        </div>
    );
}
export default React.memo(Tree);

const TreeNode: FunctionComponent<TreeNodeProps> = ({ setReplyTo, styles, node, fetchMore, renderItem }) => {
    const [isChildVisible, setChildVisibility] = useState(false)
    const [child, setChild] = useState<any[]>([]);
    const handleFetch = async (event: any) => {
        event.stopPropagation();
        if (!isChildVisible) {
            const childNode = await fetchMore(node);
            setChild(childNode)
            setChildVisibility(true)
        } else {
            setChildVisibility(false)
        }
    }
    return (<>
        <div className={`${classes.node_container} ${styles.treeNodeClassName}`}>
            {renderItem(node)}
            {!!node && (<div className={classes.node_links}>
                <div className={`${classes.node_link} ${isChildVisible && classes.node_link_active}`} onClick={handleFetch}>
                    {isChildVisible ? 'See less' : 'See more '}
                </div>
                <div onClick={(event) => {
                    event.stopPropagation();
                    setReplyTo({ data: node, setChild });
                }}>Reply</div>
            </div>
            )}
        </div>
        {!!node && isChildVisible && <div className={classes.node_child}>
            <Tree setReplyTo={setReplyTo} renderItem={renderItem} styles={styles} fetchMore={fetchMore} key={node._id + 'tree'} data={child} />
        </div>}
    </>);
}
