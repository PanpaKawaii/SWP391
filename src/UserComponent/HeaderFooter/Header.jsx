import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

import InnoSpace from '../../BackgroundImage/InnoSpace.png';

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



    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('UserId')
        localStorage.removeItem('UserRole')
        console.log('Loged out')
        window.location.href = 'http://localhost:5173/signinsignup';
    }



    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                try {
                    const userResponse = await fetch(`https://localhost:7166/api/User/${id}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                    });
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
            {/* <div className='search-bar'>
                <CDBInput type='text' placeholder='Tìm kiếm...' style={{ width: '100%', maxWidth: '300px' }} />
            </div> */}

            {/* {isNaN(id) ?
                (<Link to='/signinsignup'><i className='fas fa-sign-in-alt'></i> Đăng nhập</Link>)
                :
                ( */}
            <>
                <div className='d-flex dropdown' onClick={toggleDropdown} ref={dropdownRef}>
                    <button className='user-avatar'>
                        <img src={USER ? USER.image : InnoSpace} alt={USER ? USER.name : ''} />
                        {USER &&
                            <div className='user-info'>
                                <div className='username'>{USER.name}</div>
                                <div className='role'>{USER.role}</div>
                            </div>
                        }

                        {isDropdownOpen && (
                            <div className='dropdown-menu show'>
                                <Link className='dropdown-item' to='/user/information'><i className='fa-solid fa-user icon'></i> Thông tin cá nhân</Link>
                                <Link className='dropdown-item' onClick={handleLogout}><i className='fas fa-sign-out-alt icon'></i> Đăng xuất</Link>
                            </div>
                        )}
                    </button>
                </div>
            </>
            {/* )
            } */}
            {/* <div className='dropdown' ref={dropdownRef}>
                <button
                    className='dropdown-toggle'
                    type='button'
                    onClick={toggleDropdown}
                    aria-haspopup='true'
                    aria-expanded={isDropdownOpen}>

                    <i className='fas fa-cog'></i>
                </button>
                {isDropdownOpen && (
                    <div className='dropdown-menu show'>
                        <Link className='dropdown-item' to='/user/information'>Profile</Link>
                        <Link className='dropdown-item' to='/signinsignup'>Logout</Link>
                    </div>
                )}
            </div> */}
        </div>
    )
}
