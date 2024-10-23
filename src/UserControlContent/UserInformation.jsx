import React from 'react'
import { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import './UserInformation.css';

import home from '../BackgroundImage/home.jpg';

export default function UserInformation() {

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


    if (loading) return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Spinner animation="border" role="status" style={{ width: '200px', height: '200px', fontSize: '50px' }}>
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );
    if (error) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Error: {error.message}</div>;

    return (
        <div className='user-information'>
            <div className='user-information-content'>

                <section className='basic-information'>
                    <div className='basic-information-content'>
                        <div className='information-title row-under'>Thông tin cơ bản</div>
                        <div className='row-under'><strong>Tên:</strong> {USER ? USER.name : '...'}</div>
                        <div ><strong>Điểm:</strong> {USER ? USER.point : '...'}</div>
                    </div>
                    <div><img className='avatar' src={home} alt='avatar' /></div>
                </section>

                <section className='contact-information'>
                    <div className='information-title row-under'>Thông tin liên hệ</div>
                    <div className='row-under'><strong>Email:</strong> {USER ? USER.email : '...'}</div>
                    <div ><strong>Số điện thoại:</strong> {USER ? USER.phoneNumber : '...'}</div>
                </section>

                <section className='password-change'>
                    <div className='information-title row-under'>Đổi mật khẩu</div>
                    <div className='form-input'>
                        <input id='oldPassword' type='password' placeholder='Mật khẩu cũ' required className='underline-input' />
                        <input id='newPassword' type='password' placeholder='Mật khẩu mới' required className='underline-input' />
                        <input id='confirmNewPassword' type='password' placeholder='Nhập lại mật khẩu mới' required className='underline-input' />
                    </div>
                    <div className='password-change-button'>
                        <button type='submit' className='btn'>Đổi mật khẩu</button>
                    </div>
                </section>
            </div>
        </div>
    )
}
