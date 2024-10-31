import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './UserSideBar.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare } from '@fortawesome/free-solid-svg-icons';

export default function SideBar() {

    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleNav = () => {
        setIsOpen(!isOpen);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };



    const [id, setId] = useState(null);
    const UserId = localStorage.getItem('UserId');
    useEffect(() => {
        const UserIdInt = parseInt(UserId, 10);
        setId(UserIdInt);
    }, [UserId]);

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('UserId')
        localStorage.removeItem('UserRole')
        console.log('Loged out')
        window.location.href = 'http://localhost:5173/signinsignup';
    }

    return (
        <div className='nav'>
            <div className='user-nav'>
                <div className={`sidenav ${isOpen ? 'open' : ''}`}>

                    <div className='sidebar-header'>
                        <Link to='/'><h1><b>InnoSpace</b></h1></Link>
                    </div>

                    <Link to='/'><i className='fa-solid fa-house icon'></i> Trang chủ</Link>
                    <Link to='/about'><i className='fa-solid fa-circle-info icon'></i> Giới thiệu</Link>
                    <Link to='/booking/store'><i className='fa-solid fa-house-flag icon'></i> Cửa hàng</Link>
                    <Link to='/booking/pod'><i className='fa-solid fa-list icon'></i> Đặt chỗ</Link>
                    <Link to='/contact'><i className='fa-regular fa-address-card icon'></i> Liên hệ</Link>
                    <Link to='/paymentstatus/1'><i className='fa-solid fa-money-bill icon'></i> Thanh toán</Link>

                    {isNaN(id) ?
                        (<></>)
                        :
                        (<>
                            <Link to='/user/information'><i className='fa-solid fa-user icon'></i> Thông tin cá nhân</Link>
                            <Link to='/user/booking'><i className='fas fa-chart-bar icon'></i> Pod đã đặt</Link>
                        </>)
                    }

                    <div>.</div>

                    {isNaN(id) ?
                        (<Link to='/signinsignup'><i className='fas fa-sign-in-alt icon'></i> Đăng nhập</Link>)
                        :
                        (<Link onClick={handleLogout}><i className='fas fa-sign-out-alt icon'></i> Đăng xuất</Link>)
                    }

                    {/* <button className={`dropdown-btn ${isDropdownOpen ? 'open' : ''}`} onClick={toggleDropdown}>
                    <FontAwesomeIcon icon={faSquare} />Quản lí tài khoản
                    <i className={`fa fa-caret-down ${isDropdownOpen ? 'active' : ''}`}></i>
                </button>
                <div className={`dropdown-container ${isDropdownOpen ? 'open' : ''}`}>
                    <Link to='/customer'>Khách hàng</Link>
                    <Link to='/staff'>Nhân viên</Link>
                </div> */}

                </div>

                <div id='main-button-nav' className={isOpen ? 'shifted' : ''}>
                    <span className='toggle-button-nav' onClick={toggleNav}>
                        &#9776;
                    </span>
                </div>
            </div>

            <div id='main-background-nav' className={isOpen ? 'shifted' : 'noshifted'}>a</div>
        </div>
    )
}
