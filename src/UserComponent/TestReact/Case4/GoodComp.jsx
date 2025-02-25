import React, { useState } from 'react';
import SlowComp from '../SlowComp';

const Child = ({ children }) => {
    const [isShow, setIsShow] = useState(true);
    return <>
        <button onClick={() => setIsShow(p => !p)}>Show/Hide</button>
        {children[isShow ? 0 : 1]}
    </>
}

export default function GoodComp() {
    return (
        <div>
            GoodComp
            <Child>
                <h2>Show</h2>
                <h2>Hide</h2>
            </Child>
            <SlowComp />
        </div>
    )
}
