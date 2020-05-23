import { useEffect } from 'react'
import equal from 'fast-deep-equal'
import getDomTree from './getDomTree'

//https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
}

export default function createTest() {
    const components = new Map()
    const state = {
        running: false,
        blue: '0',
        red: '0',
    }

    function report() {
        let renders = 0
        let totalRenderTime = 0
        components.forEach((data) => {
            renders += data.renders
            totalRenderTime += data.totalRenderTime
            console.log(data)
        })
        console.log({
            renders,
            time: (state.endtAt - state.startAt) / 1000,
            totalRenderTime: totalRenderTime / 1000,
        })
    }

    function start(loops = 100) {
        state.startAt = Date.now()
        state.running = true
        while (loops-- > 0) {
            const onClicks = []
            components.forEach((data) => {
                if (data.onClick) {
                    click(data)
                    // onClicks.push(data)
                }
            })
            shuffleArray(onClicks).forEach((data) => click(data))
        }
        state.running = false
    }

    function useRegisterRender(name, { onClick, blueRef } = {}) {
        if (!components.has(name)) {
            components.set(name, {
                name,
                renders: 0,
                totalRenderTime: 0,
                clicks: 0,
                onClick,
            })
        }
        const data = components.get(name)
        const renderTime = Date.now()
        data.onClick = onClick
        data.renders += 1
        useEffect(() => {
            data.totalRenderTime += Date.now() - renderTime
            if (!state.running) {
                state.endtAt = Date.now()
            }
        })
    }

    function click(data) {
        const blue = `${data.name}-blue-${data.clicks}`
        const red = `${data.name}-red-${data.clicks}`
        state.blue = blue
        state.red = red
        data.clicks += 1
        data.onClick({ blue, red })
    }

    return {
        components,
        state,
        start,
        report,
        useRegisterRender,
    }
}

setTimeout(() => {
    const r = {
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
    const tree = getDomTree(document.getElementById('root'))
    console.log(equal(r, tree), tree)
}, 1000)
