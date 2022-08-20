import React, { FunctionComponent, useState } from "react";

interface TreeNodeProps {
    node: { _id: string; content: any; createdAt: string; user?: string; };
    fetchMore: (data: any) => any;
    styles: { treeClassName?: string; treeNodeClassName?: string; };
}

interface TreeProps {
    data: any[];
    fetchMore: (data: any) => any;
    styles: { treeClassName?: string; treeNodeClassName?: string; };
}

const Tree: FunctionComponent<TreeProps> = ({ data = [], fetchMore, styles }) => {
    return (
        <div className={styles.treeClassName}>
            {data?.map((tree) => <TreeNode styles={styles} fetchMore={fetchMore} key={tree._id + 'treeNode'} node={tree} />)}
        </div>
    );
}
export default React.memo(Tree);

const TreeNode: FunctionComponent<TreeNodeProps> = ({ styles, node, fetchMore }) => {
    const [isChildVisible, setChildVisibility] = useState(false)
    const [child, setChild] = useState<TreeNodeProps[]>([]);
    const handleFetch = async () => {
        if (!isChildVisible) {
            const childNode = await fetchMore({ commentId: node._id });
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
                &nbsp;&nbsp;{node?.content}
            </div>
        </div>
        {!!node && isChildVisible && <div>
            <Tree styles={styles} fetchMore={fetchMore} key={node._id + 'tree'} data={child} />
        </div>}
    </>);
}
