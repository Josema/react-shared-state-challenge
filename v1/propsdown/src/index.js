// import React from 'react'
// import ReactDOM from 'react-dom'

import {
    // createTest,
    // getTree,
    createDynamicProp,
    updateTree,
} from 'react-shared-state-challenge'
// import App from './App'

// https://blog.isquaredsoftware.com/2020/05/blogged-answers-a-mostly-complete-guide-to-react-rendering-behavior/
const tree = {
    id: 'root',
    type: 'div',
    children: [
        {
            id: 'App',
            type: 'div',
            children: [
                {
                    id: 'A1',
                    type: 'div',
                    children: [
                        { type: 'span', children: [createDynamicProp('blue')] },
                        {
                            id: 'A2',
                            type: 'div',
                            children: [
                                {
                                    type: 'span',
                                    children: [createDynamicProp('blue')],
                                },
                                {
                                    type: 'span',
                                    children: [createDynamicProp('red')],
                                },
                            ],
                        },
                        {
                            id: 'A3',
                            type: 'div',
                            children: [
                                {
                                    type: 'span',
                                    children: [createDynamicProp('blue')],
                                },
                            ],
                        },
                    ],
                },
                {
                    id: 'C1',
                    type: 'div',
                    children: [
                        {
                            id: 'C2',
                            type: 'div',
                            children: [
                                {
                                    type: 'span',
                                    children: [createDynamicProp('red')],
                                },
                            ],
                        },
                        { id: 'C3', type: 'div', children: [] },
                    ],
                },
            ],
        },
    ],
}

// console.log({ tree })
console.log(updateTree(tree, { red: 'leeeed', blue: 'bleeeed' }))
console.log(updateTree(tree, { red: 'RED', blue: 'BLUE' }))

// const element = document.getElementById('root')
// const { match } = createTest({
//     testId: 'prowsdown',
//     element,
// })
// setTimeout(() => {
//     match({ element, tree })
// }, 1000)

// ReactDOM.render(<App />, element)
