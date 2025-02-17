import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button } from 'react-bootstrap';
import User from './TestUser';
import './TypePi.css';

export default function TestApp() {

    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log('App re-render');
    }, []);

    let BNT;
    for (let index = 0; index < 1000; index++) {
        BNT += index;
    }

    const Function = useCallback(() => {
        console.log('This is a function');
        let element;
        for (let index = 0; index < 100; index++) {
            element += index;
        }
        return element;
    }, []);

    const Array = useMemo(() => [1, 2, 3, 4], []);

    const Object = useCallback(() => ({
        a: 0,
        b: true,
    }), []);

    return (
        <div>
            App
            <Button onClick={() => setCount(prev => prev + 1)}>{count}</Button>
            {/* <User /> */}
            {/* <User count={count} /> */}
            <User BNT={BNT} Array={Array} Function={Function} Object={Object} />
        </div>
    )
}
