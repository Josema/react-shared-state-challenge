import React, { useState, useRef } from 'react'
import createTest from './profile'

const test = createTest()
const { useRegisterRender } = test
window.test = test

export default function App() {
    const [blue, setBlue] = useState(0)
    const [red, setRed] = useState(0)
    useRegisterRender('App')
    return (
        <div>
            <A1 blue={blue} red={red} setBlue={setBlue} setRed={setRed} />
            <C1 blue={blue} red={red} setBlue={setBlue} setRed={setRed} />
        </div>
    )
}

// AAAAA
function A1({ blue, red, setBlue, setRed }) {
    const blueRef = useRef(null)
    useRegisterRender('A1', { blueRef })
    return (
        <div>
            <span ref={blueRef}>{blue}</span>
            <A2 blue={blue} red={red} />
            <A3 blue={blue} setBlue={setBlue} />
        </div>
    )
}

function A2({ blue, red }) {
    useRegisterRender('A2', {})
    return (
        <div>
            <span>{blue}</span>
            <span>{red}</span>
        </div>
    )
}

function A3({ blue, setBlue }) {
    function onClick({ blue }) {
        setBlue(blue)
    }
    useRegisterRender('A3', { onClick })
    return (
        <div>
            <span>{blue}</span>
        </div>
    )
}

// CCCC
function C1({ blue, red, setBlue, setRed }) {
    function onClick({ blue }) {
        setBlue(blue)
    }
    useRegisterRender('C1', { onClick })
    return (
        <div>
            <C2 blue={blue} red={red} setBlue={setBlue} setRed={setRed} />
            <C3 setBlue={setBlue} setRed={setRed} />
        </div>
    )
}

function C2({ blue, red, setBlue, setRed }) {
    function onClick({ red }) {
        setRed(red)
    }
    useRegisterRender('C2', { onClick })
    return (
        <div>
            <span>{red}</span>
        </div>
    )
}

const C3 = React.memo(function C3({ setBlue, setRed }) {
    function onClick({ blue, red }) {
        setBlue(blue)
        setRed(red)
    }
    useRegisterRender('C3', { onClick })
    return <div />
})
