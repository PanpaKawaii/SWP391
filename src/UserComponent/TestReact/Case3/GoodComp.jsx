import React, { useState } from 'react';
import SlowComp from '../SlowComp';

const Child = ({ ui }) => {
    const [count, setCount] = useState(0);
    return <>
        <button onClick={() => setCount(p => p + 1)}>
            UP {count}
        </button>
        {ui}
    </>
}

//Component As Props
export default function GoodComp() {
    return (
        <div>
            GoodComp
            <Child ui={<SlowComp />} />
        </div>
    )
}
