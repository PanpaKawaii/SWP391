import React from 'react'
import { useState, useEffect } from 'react';
import { Form, InputGroup, Button, Spinner } from 'react-bootstrap';
import './UserInformation.css';

import InnoSpace from '../../BackgroundImage/InnoSpace.png';

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

    const [ChangeFullNameError, setChangeFullNameError] = useState(null);
    const [ChangePhoneNumberError, setChangePhoneNumberError] = useState(null);
    const [ChangeAvatarError, setChangeAvatarError] = useState(null);
    const [ChangePasswordError, setChangePasswordError] = useState(null);
    const [ChangeConfirmPasswordError, setChangeConfirmPasswordError] = useState(null);
    const [ChangeInformationSuccess, setChangeInformationSuccess] = useState(null);
    const [ChangePasswordSuccess, setChangePasswordSuccess] = useState(null);

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

    const ChangeInformation = async (ChangeFullName, ChangePhoneNumber, ChangeAvatar) => {

        if (!ChangeFullName) {
            console.error('Invalid full name');
            setChangeFullNameError('Họ tên không hợp lệ');
            return;
        }
        if (!ChangePhoneNumber) {
            console.error('Invalid phone number');
            setChangePhoneNumberError('Số điện thoại không hợp lệ');
            return;
        }
        if (!ChangeAvatar) {
            console.error('Invalid avatar');
            setChangeAvatarError('Đường dẫn ảnh không hợp lệ');
            return;
        }

        if (!/^\d+$/.test(ChangePhoneNumber)) {
            console.error('Phone number must contain only digits');
            setChangePhoneNumberError('Số điện thoại không hợp lệ');
            return;
        }
        if (ChangePhoneNumber.length !== 10) {
            console.error('Phone number must contain exactly 10 digits');
            setChangePhoneNumberError('Số điện thoại phải có 10 chữ số');
            return;
        }

        const changeData = {
            id: USER.id,
            email: USER.email,
            password: USER.password,
            name: ChangeFullName,
            image: ChangeAvatar,
            role: USER.role,
            type: USER.type,
            phoneNumber: ChangePhoneNumber,
            point: USER.point,
            description: USER.description,
        };
        console.log('Change Information Data:', changeData);

        try {
            const response = await fetch(`https://localhost:7166/api/User/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(changeData),
            });

            if (!response.ok) throw new Error('Network response was not ok');
            // const data = await response.json();
            setLoading(false);
            setChangeInformationSuccess('Thay đổi thông tin thành công');
            setUSER(changeData);

        } catch (error) {
            setError(error);
            alert('Thay đổi thông tin thất bại');
            setLoading(false);
        }
    }
    const handleChangeInformation = (e) => {
        e.preventDefault();
        setError(null);
        setChangeInformationSuccess(null);

        setChangeFullNameError(null);
        setChangePhoneNumberError(null);
        setChangeAvatarError(null);
        ChangeInformation(e.target.formName.value, e.target.formPhoneNumber.value, e.target.formAvatar.value);
    }
    const handleResetChangeInformation = () => {
        setChangeInformationSuccess(null);

        setChangeFullNameError(null);
        setChangePhoneNumberError(null);
        setChangeAvatarError(null);
    }

    const ChangePassword = async (OldPassword, ChangePassword, ChangeConfirm) => {

        if (!OldPassword) {
            console.error('Invalid password');
            setChangePasswordError('Mật khẩu cũ không hợp lệ');
            return;
        }
        if (!ChangePassword) {
            console.error('Invalid password');
            setChangePasswordError('Mật khẩu mới không hợp lệ');
            return;
        }
        if (!ChangeConfirm) {
            console.error('Invalid password confirmation');
            setChangeConfirmPasswordError('Xác nhận mật khẩu không hợp lệ');
            return;
        }

        if (ChangePassword.length < 6) {
            console.error('Password must be at least 6 characters long');
            setChangePasswordError('Mật khẩu mới phải ít nhất 6 kí tự');
            return;
        }
        if (OldPassword != USER.password) {
            console.error('Wrong old password');
            setChangePasswordError('Mật khẩu cũ không khớp');
            return;
        }
        if (ChangePassword != ChangeConfirm) {
            console.error('Wrong password confirmation');
            setChangeConfirmPasswordError('Mật khẩu xác nhận không khớp');
            return;
        }

        const changeData = {
            id: USER.id,
            email: USER.email,
            password: ChangePassword,
            name: USER.name,
            image: USER.image,
            role: USER.role,
            type: USER.type,
            phoneNumber: USER.phoneNumber,
            point: USER.point,
            description: USER.description,
        };
        console.log('Change Information Data:', changeData);

        try {
            const response = await fetch(`https://localhost:7166/api/User/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(changeData),
            });

            if (!response.ok) throw new Error('Network response was not ok');
            // const data = await response.json();
            setLoading(false);
            setChangePasswordSuccess('Thay đổi mật khẩu thành công');
            setUSER(changeData);

        } catch (error) {
            setError(error);
            alert('Thay đổi mật khẩu thất bại');
            setLoading(false);
        }
    }
    const handleChangePassword = (e) => {
        e.preventDefault();
        setError(null);
        setChangePasswordSuccess(null);

        setChangePasswordError(null);
        setChangeConfirmPasswordError(null);
        ChangePassword(e.target.formOldPassword.value, e.target.formNewPassword.value, e.target.formConfirmNewPassword.value);
    }
    const handleResetChangePassword = () => {
        setChangePasswordSuccess(null);

        setChangePasswordError(null);
        setChangeConfirmPasswordError(null);
    }


    if (loading) return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Spinner animation='border' role='status' style={{ width: '200px', height: '200px', fontSize: '50px' }}>
                <span className='visually-hidden'>Loading...</span>
            </Spinner>
        </div>
    );
    // if (error) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Error: {error.message}</div>;

    return (
        <div className='user-information'>
            <div className='user-information-content'>

                <section className='basic-information'>
                    <div className='basic-information-box'>
                        <h3><b>Thông tin cơ bản</b></h3>
                        <p><b>Tên:</b> {USER ? USER.name : '...'}</p>
                        <p><b>Điểm:</b> {USER ? USER.point : '...'}</p>
                        <p><b>Mô tả:</b> {USER ? USER.description : '...'}</p>
                        <p><b>Danh hiệu:</b> {USER ? USER.type : '...'}</p>
                    </div>
                    <div><img className='avatar' src={USER ? USER.image : InnoSpace} alt={USER ? USER.name : ''} /></div>
                </section>

                <section className='contact-information'>
                    <h3><b>Thông tin liên hệ</b></h3>
                    <p><b>Email:</b> {USER ? USER.email : '...'}</p>
                    <p><b>Số điện thoại:</b> {USER ? USER.phoneNumber : '...'}</p>
                </section>

                <section className='change-information'>
                    <h3><b>Thay đổi thông tin</b></h3>
                    <div className='form-container'>
                        <Form className='change-information-form' onSubmit={handleChangeInformation}>

                            <Form.Group controlId='formName' className='form-group'>
                                <InputGroup>
                                    <InputGroup.Text>Họ tên</InputGroup.Text>
                                    <Form.Control type='text' placeholder='Nhập họ tên' defaultValue={USER ? USER.name : ''} />
                                </InputGroup>
                            </Form.Group>

                            <Form.Group controlId='formPhoneNumber' className='form-group'>
                                <InputGroup>
                                    <InputGroup.Text>Số điện thoại</InputGroup.Text>
                                    <Form.Control type='text' placeholder='Nhập số điện thoại' defaultValue={USER ? USER.phoneNumber : ''} />
                                </InputGroup>
                            </Form.Group>

                            <Form.Group controlId='formAvatar' className='form-group'>
                                <InputGroup>
                                    <InputGroup.Text>Ảnh đại diện</InputGroup.Text>
                                    <Form.Control type='text' placeholder='Nhập đường dẫn ảnh' defaultValue={USER ? USER.image : ''} />
                                </InputGroup>
                            </Form.Group>

                            {ChangeFullNameError && <span className='error-message'>{ChangeFullNameError}</span>}
                            {ChangePhoneNumberError && <span className='error-message'>{ChangePhoneNumberError}</span>}
                            {ChangeAvatarError && <span className='error-message'>{ChangeAvatarError}</span>}
                            {ChangeInformationSuccess && <span className='success-message'>{ChangeInformationSuccess}</span>}

                            <div className='change-information-button'>
                                <Button type='submit' className='btn'>THAY ĐỔI THÔNG TIN</Button>
                                <Button type='reset' className='btn btn-reset' onClick={handleResetChangeInformation}>ĐẶT LẠI</Button>
                            </div>
                        </Form>

                        <div style={{ height: '180px', borderRight: '1px solid #a3a3a380' }}></div>

                        <Form className='change-information-form' onSubmit={handleChangePassword}>

                            <Form.Group controlId='formOldPassword' className='form-group'>
                                <InputGroup>
                                    <InputGroup.Text>Mật khẩu cũ</InputGroup.Text>
                                    <Form.Control type='password' placeholder='Nhập mật khẩu cũ' />
                                </InputGroup>
                            </Form.Group>

                            <Form.Group controlId='formNewPassword' className='form-group'>
                                <InputGroup>
                                    <InputGroup.Text>Mật khẩu mới</InputGroup.Text>
                                    <Form.Control type='password' placeholder='Nhập mật khẩu mới' />
                                </InputGroup>
                            </Form.Group>

                            <Form.Group controlId='formConfirmNewPassword' className='form-group'>
                                <InputGroup>
                                    <InputGroup.Text>Xác nhận</InputGroup.Text>
                                    <Form.Control type='password' placeholder='Xác nhận mật khẩu mới' />
                                </InputGroup>
                            </Form.Group>

                            {ChangePasswordError && <span className='error-message'>{ChangePasswordError}</span>}
                            {ChangeConfirmPasswordError && <span className='error-message'>{ChangeConfirmPasswordError}</span>}
                            {ChangePasswordSuccess && <span className='success-message'>{ChangePasswordSuccess}</span>}

                            <div className='change-information-button'>
                                <Button type='submit' className='btn'>THAY ĐỔI MẬT KHẨU</Button>
                                <Button type='reset' className='btn btn-reset' onClick={handleResetChangePassword}>ĐẶT LẠI</Button>
                            </div>
                        </Form>
                    </div>
                </section>

            </div>
        </div>
    )
}
