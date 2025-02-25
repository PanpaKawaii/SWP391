import React, { useState } from 'react';
import SlowComp from '../SlowComp';

export default function BadComp() {
    const [isShow, setIsShow] = useState(true);
    return (
        <div>
            BadComp
            <button onClick={() => setIsShow(p => !p)}>Show/Hide</button>
            {
                isShow ?
                    <h1>Show</h1>
                    :
                    <h1>Hide</h1>
            }
            <SlowComp />
        </div>
    )
}
