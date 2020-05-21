import { useEffect } from 'react'

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
        blue: '',
    }

    function report() {
        let renders = 0
        components.forEach((data) => {
            renders += data.renders
            console.log(data)
        })
        console.log({
            renders,
            time: (state.endtAt - state.startAt) / 1000,
        })
    }

    function start(loops = 100) {
        state.startAt = Date.now()
        state.running = true
        // while (loops > 0) {
        //     const onClicks = []
        //     components.forEach((data) => {
        //         if (data.onClick) {
        //             if (!data.rendering) {
        //                 loops -= 1
        //                 onClicks.push(data)
        //                 console.log(data.name, data.rendering)
        //             }
        //         }
        //     })
        //     shuffleArray(onClicks).forEach((data) => click(data))
        // }
        // state.running = false
    }

    function useRegisterRender(name, { onClick } = {}) {
        if (!components.has(name)) {
            components.set(name, {
                name,
                renders: 0,
                clicks: 0,
                rendering: false,
                onClick,
            })
        }
        const data = components.get(name)
        data.onClick = onClick
        data.renders += 1
        data.rendering = true

        useEffect(() => {
            data.rendering = false
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
