import { FunctionComponent, useState } from "react";

interface TreeNodeProps {
    node: { id: string; children: any; label: string; hasChildren?: boolean }
}

interface TreeProps {
    data: any[];
}

const Tree: FunctionComponent<TreeProps> = ({ data = [] }) => {
    return (<div>{
        data?.map((tree) => <TreeNode key={tree.id+'treeNode'} node={tree} />)
    }</div>);
}

export default Tree;
const TreeNode: FunctionComponent<TreeNodeProps> = ({ node }) => {
    const [isChildVisible, setChildVisibility] = useState(false)
    const [child, setChild] = useState<TreeNodeProps[]>([])
    const handleFetch = async () => {
        // const res = await fetch('http://localhost:4000/getChildren/' + node.id);
        // if (res.ok) {
        //     const data = await res.json();
        //     setChildVisibility(true)
        //     setChild(data);
        // }
    }
    return (<>
        <div style={{ display: 'flex' }} onClick={handleFetch}>
            {node?.hasChildren && (
                <div>
                    {isChildVisible ? '-' : '+'}
                </div>
            )}
            <div>
                &nbsp;&nbsp;{node.label}
            </div>
        </div>
        {node?.hasChildren && isChildVisible && <div>
            <Tree key={node.id + 'tree'} data={child} />
        </div>}
    </>);
}
