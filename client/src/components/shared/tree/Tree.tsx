import React, { FunctionComponent, useState } from "react";

interface TreeNodeProps {
    node: { _id: string; content: any; createdAt: string; user?: string; };
    fetchMore: (data: any) => any;
    styles: { treeClassName?: string; treeNodeClassName?: string; };
    renderItem: (data: any) => React.ReactNode;
}

interface TreeProps {
    data: any[];
    renderItem: (data: any) => React.ReactNode;
    fetchMore: (data: any) => any;
    styles: { treeClassName?: string; treeNodeClassName?: string; };
}

const Tree: FunctionComponent<TreeProps> = ({ data = [], fetchMore, styles, renderItem }) => {
    return (
        <div className={styles.treeClassName}>
            {data?.map((tree) => <TreeNode renderItem={renderItem} styles={styles} fetchMore={fetchMore} key={tree._id + 'treeNode'} node={tree} />)}
        </div>
    );
}
export default React.memo(Tree);

const TreeNode: FunctionComponent<TreeNodeProps> = ({ styles, node, fetchMore, renderItem }) => {
    const [isChildVisible, setChildVisibility] = useState(false)
    const [child, setChild] = useState<TreeNodeProps[]>([]);
    const handleFetch = async () => {
        if (!isChildVisible) {
            const childNode = await fetchMore(node);
            setChild(childNode)
            setChildVisibility(true)
        } else {
            setChildVisibility(false)
        }
    }
    return (<>
        <div className={styles.treeNodeClassName} style={{ display: 'flex', color: 'white' }} onClick={handleFetch}>
            {!!node && (
                <div>
                    {isChildVisible ? '-' : '+'}
                </div>
            )}
            <div style={{ color: 'white' }}>
                {renderItem(node)}
            </div>
        </div>
        {!!node && isChildVisible && <div>
            <Tree renderItem={renderItem} styles={styles} fetchMore={fetchMore} key={node._id + 'tree'} data={child} />
        </div>}
    </>);
}
