import { useEffect, useState } from 'react'
import { createStore } from 'dop'

const store = createStore({
    blue: 0,
    red: 0,
})

function setGlobalState(patch) {
    store
        .applyPatch(patch)
        .filter(({ mutations }) => mutations.length > 0)
        .forEach(({ listener, patch }) => listener(patch))
}

// React hook
export function useGlobalState(...props) {
    const [, forceUpdate] = useState()
    useEffect(() => {
        const filter = ({ path }) => props.includes(path.join('.'))
        return store.subscribe(forceUpdate, filter)
    }, [forceUpdate, props])
    return [store.state, setGlobalState]
}
