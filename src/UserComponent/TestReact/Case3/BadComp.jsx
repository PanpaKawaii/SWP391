import React, { useState } from 'react';
import SlowComp from '../SlowComp';

export default function BadComp() {
    const [count, setCount] = useState(0);
    return (
        <div>
            BadComp
            <button onClick={() => setCount(p => p + 1)}>
                UP {count}
            </button>
            <SlowComp />
        </div>
    )
}
