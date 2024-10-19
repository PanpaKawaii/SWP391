import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CDBInput } from 'cdbreact';
import './Header.css';

import YellowBanana from '../BackgroundImage/YellowBanana.jpg';

export default function Header() {

    const [id, setId] = useState(null);
    const UserId = localStorage.getItem('UserId');
    useEffect(() => {
        const UserIdInt = parseInt(UserId, 10);
        setId(UserIdInt);
    }, [UserId]);

    const [USER, setUSER] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                try {
                    const userResponse = await fetch(`https://localhost:7166/api/User/${id}`);
                    if (!userResponse.ok) throw new Error('Network response was not ok');
                    const userData = await userResponse.json();
                    setUSER(userData);
                    setLoading(false);
                } catch (error) {
                    setError(error);
                    setLoading(false);
                }
            };

            fetchData();
        }
    }, [id]);

    return (
        <div className='user-header-container'>
            <div className='search-bar'>
                <CDBInput type='text' placeholder='Tìm kiếm...' style={{ width: '100%', maxWidth: '300px' }} />
            </div>
            {isNaN(id) ?
                (<Link to='/signinsignup'><i className='fas fa-sign-in-alt'></i> Đăng nhập</Link>)
                : (
                    <div className='d-flex align-items-center'>
                        <div className='user-avatar'>
                            <img src={YellowBanana} alt='Avatar' />
                        </div>
                        {USER &&
                            <div className='user-info'>
                                <div className='username'>{USER.name}</div>
                                <div className='role'>{USER.role}</div>

                            </div>
                        }
                    </div>
                )
            }
        </div>
    );
}
