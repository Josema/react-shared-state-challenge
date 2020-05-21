import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import App from '../src/App'

Enzyme.configure({ adapter: new Adapter() })

test('<App />', async () => {
    const app = mount(<App />).children(0)
    const A1 = app.children(0)
    // const A2 = A1.children(1)
    // const A3 = A1.children(1)
    console.log(A1.children(0))
    // expect(wrapper.contains(welcome)).toBe(true)
    // expect(wrapper.contains(welcome)).toEqual(true)
})
