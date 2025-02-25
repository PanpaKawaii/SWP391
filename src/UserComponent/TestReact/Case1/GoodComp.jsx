import React, { useState } from 'react';
import SlowComp from '../SlowComp';

const Child = () => {
    const [count, setCount] = useState(0);
    return <>
        <button onClick={() => setCount(p => p + 1)}>
            UP {count}
        </button>
    </>
}

//Moving State Down
export default function GoodComp() {
    return (
        <div>
            GoodComp
            <Child />
            <SlowComp />
        </div>
    )
}
