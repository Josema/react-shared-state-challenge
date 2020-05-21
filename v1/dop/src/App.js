import React from 'react'
import createTest from './profile'
import { useGlobalState } from './store'

const test = createTest()
const { useRegisterRender } = test
window.test = test

export default function App() {
    useRegisterRender('App')
    return (
        <div>
            <A1 />
            <C1 />
        </div>
    )
}

// AAAAA
const A1 = React.memo(function A1() {
    const [{ blue }] = useGlobalState('blue')
    useRegisterRender('A1')
    return (
        <div>
            <span>{blue}</span>
            <A2 />
            <A3 />
        </div>
    )
})

const A2 = React.memo(function A2() {
    const [{ blue, red }] = useGlobalState('blue', 'red')
    useRegisterRender('A2')
    return (
        <div>
            <span>{blue}</span>
            <span>{red}</span>
        </div>
    )
})

const A3 = React.memo(function A3() {
    const [{ blue }, setGlobalState] = useGlobalState('blue')
    function onClick({ blue }) {
        setGlobalState({ blue })
    }
    useRegisterRender('A3', { onClick })
    return (
        <div>
            <span>{blue}</span>
        </div>
    )
})

// CCCC
const C1 = React.memo(function C1() {
    const [, setGlobalState] = useGlobalState()
    function onClick({ blue }) {
        setGlobalState({ blue })
    }
    useRegisterRender('C1', { onClick })
    return (
        <div>
            <C2 />
            <C3 />
        </div>
    )
})

const C2 = React.memo(function C2() {
    const [{ red }, setGlobalState] = useGlobalState('red')
    function onClick({ red }) {
        setGlobalState({ red })
    }
    useRegisterRender('C2', { onClick })
    return (
        <div>
            <span>{red}</span>
        </div>
    )
})

const C3 = React.memo(function C3() {
    const [, setGlobalState] = useGlobalState()
    function onClick({ blue, red }) {
        setGlobalState({ blue, red })
    }
    useRegisterRender('C3', { onClick })
    return <div />
})
