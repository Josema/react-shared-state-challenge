import { useEffect } from 'react'
require('@wildpeaks/snapshot-dom')

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
                    onClicks.push(data)
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

        // const snapshot = window.snapshotToJSON(document.getElementById('root'))
        // if (snapshot.childNodes && data.name === 'A1') {
        //     console.log(
        //         'normal',
        //         state.blue,
        //         snapshot.childNodes[0].childNodes[0].childNodes[0].childNodes[0]
        //             .nodeValue
        //     )
        // }

        useEffect(() => {
            data.totalRenderTime += Date.now() - renderTime
            if (!state.running) {
                state.endtAt = Date.now()
            }

            const snapshot = window.snapshotToJSON(
                document.getElementById('root')
            )
            if (snapshot.childNodes && data.name === 'A1') {
                const value =
                    snapshot.childNodes[0].childNodes[0].childNodes[0]
                        .childNodes[0].nodeValue
                console.log('useEffect', state.blue === value, {
                    state: state.blue,
                    dom: value,
                    ref: blueRef.current.innerHTML,
                })
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
