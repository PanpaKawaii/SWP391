import React from 'react'
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../../Context/AuthContext'
import './UserSideBar.css';

export default function SideBar() {

    const [isOpen, setIsOpen] = useState(false);

    const toggleNav = () => {
        setIsOpen(!isOpen);
    };


    const navigate = useNavigate();
    const { logout } = UserAuth();

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
        localStorage.removeItem('isLogIn');
        localStorage.setItem('isLogIn', 'false');
        logout();
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
                    <Link to='/booking/store'><i className='fa-solid fa-house-flag icon'></i> Chi nhánh</Link>
                    <Link to='/booking/pod'><i className='fa-solid fa-list icon'></i> Đặt chỗ</Link>
                    <Link to='/contact'><i className='fa-regular fa-address-card icon'></i> Liên hệ</Link>
                    {/* <Link to='/paymentstatus/'><i className='fa-solid fa-money-bill icon'></i> Thanh toán</Link> */}

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
