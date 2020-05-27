import equal from 'fast-deep-equal'
import _ from 'lodash'

export function matchTrees(tree1, tree2) {
    return equal(tree1, tree2)
}

export function updateTree(model, state) {
    return _.cloneDeepWith(model, (fn, key) => {
        if (typeof fn === 'function') {
            return fn(state)
        }
        // return fn
    })
}

export function createDynamicProp(prop) {
    return (state) => {
        return state[prop]
    }
}

export function getTree(parent, tree = {}) {
    const id = parent.getAttributeNode('id')
    if (id && id.value) tree.id = id.value
    tree.type = parent.nodeName.toLowerCase()
    tree.children = []
    const nodes = parent.childNodes
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        if (node.nodeType === 1) {
            tree.children[i] = {}
            getTree(node, tree.children[i])
        } else {
            tree.children[i] = node.nodeValue
        }
    }

    return tree
}

// const tests = {}

// export function createTest({ id, element }) {
//     tests[id] = {}

//     function match({ element, tree }) {
//         // console.log(JSON.stringify(getDomTree(element)))
//         console.log(tree)
//     }

//     return { match }
// }

export function useRegisterRender({
    testId,
    componentId,
    onClick,
    blueRef,
} = {}) {
    // console.log('useRegisterRender', {
    //     testId,
    //     componentId,
    //     onClick,
    //     blueRef,
    // })
}

// export function useRegisterRender(name, { onClick, blueRef } = {}) {
//     if (!components.has(name)) {
//         components.set(name, {
//             name,
//             renders: 0,
//             totalRenderTime: 0,
//             clicks: 0,
//             onClick,
//         })
//     }
//     const data = components.get(name)
//     const renderTime = Date.now()
//     data.onClick = onClick
//     data.renders += 1
//     useEffect(() => {
//         data.totalRenderTime += Date.now() - renderTime
//         if (!state.running) {
//             state.endtAt = Date.now()
//         }
//     })
// }

// export function createTest() {
//     const components = new Map()
//     const state = {
//         running: false,
//         blue: '0',
//         red: '0',
//     }

//     function report() {
//         let renders = 0
//         let totalRenderTime = 0
//         components.forEach((data) => {
//             renders += data.renders
//             totalRenderTime += data.totalRenderTime
//             console.log(data)
//         })
//         console.log({
//             renders,
//             time: (state.endtAt - state.startAt) / 1000,
//             totalRenderTime: totalRenderTime / 1000,
//         })
//     }

//     function start(loops = 100) {
//         state.startAt = Date.now()
//         state.running = true
//         while (loops-- > 0) {
//             const onClicks = []
//             components.forEach((data) => {
//                 if (data.onClick) {
//                     click(data)
//                     // onClicks.push(data)
//                 }
//             })
//             shuffleArray(onClicks).forEach((data) => click(data))
//         }
//         state.running = false
//     }

//     function click(data) {
//         const blue = `${data.name}-blue-${data.clicks}`
//         const red = `${data.name}-red-${data.clicks}`
//         state.blue = blue
//         state.red = red
//         data.clicks += 1
//         data.onClick({ blue, red })
//     }

//     return {
//         components,
//         state,
//         start,
//         report,
//         useRegisterRender,
//     }
// }

// //https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
// function shuffleArray(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1))
//         ;[array[i], array[j]] = [array[j], array[i]]
//     }
//     return array
// }
