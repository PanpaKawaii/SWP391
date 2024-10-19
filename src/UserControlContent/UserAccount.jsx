import React from 'react'
import './UserControlContent.css';

export default function UserAccount() {
    return (
        <div className='user-control-center'>
            <div className='user-control-center-container'>

                <div className='user-account'>
                    <input placeholder='Old Password'></input>
                    <input placeholder='New Password'></input>
                    <input placeholder='Confirm'></input>
                </div>
            </div>
        </div>
    )
}
