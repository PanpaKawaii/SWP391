import React from 'react'

export default function SlowComp() {
    for (let index = 0; index < 3000; index++) {
        console.log('Slow');
    }
    return (
        <div>SlowComp</div>
    )
}
