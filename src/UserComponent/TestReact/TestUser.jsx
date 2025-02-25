import React, { memo } from 'react';

function User(props) {

    console.log('User re-render');
    
    return (
        <div>
            {props.count}
        </div>
    )
}

export default memo(User)