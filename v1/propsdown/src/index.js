import React from 'react'
import ReactDOM from 'react-dom'
import createTest from 'react-shared-state-challenge'
import createApp from './App'

const tree2 = {
    A1: [
        {
            div: [],
            div: [{ span: '0' }],
        },
    ],
}

const tree = {
    type: 'div',
    children: [
        {
            type: 'div',
            children: [
                {
                    type: 'div',
                    children: [
                        { type: 'span', children: ['0'] },
                        {
                            type: 'div',
                            children: [
                                { type: 'span', children: ['0'] },
                                { type: 'span', children: ['0'] },
                            ],
                        },
                        {
                            type: 'div',
                            children: [{ type: 'span', children: ['0'] }],
                        },
                    ],
                },
                {
                    type: 'div',
                    children: [
                        {
                            type: 'div',
                            children: [{ type: 'span', children: ['0'] }],
                        },
                        { type: 'div', children: [] },
                    ],
                },
            ],
        },
    ],
}

const element = document.getElementById('root')
const { useRegisterRender } = createTest({
    component: createApp,
    element,
    tree,
})

const App = createApp({ useRegisterRender })

ReactDOM.render(<App />, element)
