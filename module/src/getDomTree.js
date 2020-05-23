export default function getDomTree(parent, tree = {}) {
    tree.type = parent.nodeName.toLowerCase()
    tree.children = []
    const nodes = parent.childNodes
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        if (node.nodeType === 1) {
            tree.children[i] = {}
            getDomTree(node, tree.children[i])
        } else {
            tree.children[i] = node.nodeValue
        }
    }

    return tree
}
