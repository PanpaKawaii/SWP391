import React, { useState } from 'react';
import SlowComp from '../SlowComp';

export default function BadComp() {
    const [count, setCount] = useState(0);
    return (
        <div>
            <h1>BadComp {count}</h1>
            <button onClick={() => setCount(p => p + 1)}>
                UP
            </button>
            <SlowComp />
        </div>
    )
}
