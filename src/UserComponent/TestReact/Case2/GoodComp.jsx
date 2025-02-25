import React, { useState } from 'react';
import SlowComp from '../SlowComp';

const Child = ({ children }) => {
    const [count, setCount] = useState(0);
    return <>
        <button onClick={() => setCount(p => p + 1)}>
            UP {count}
        </button>
        {children(count)}
    </>
}

//
export default function GoodComp() {
    return (
        <div>
            <Child >
                {
                    (count) => <h1>GoodComp {count}</h1>
                }
            </Child>
            <SlowComp />
        </div>
    )
}
