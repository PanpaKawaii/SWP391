import React from 'react'
import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import './SignInSignUp.css';

import SignInImage from '../assets/PODs/meeting5.jpg'
import SignUpImage from '../assets/PODs/single6.jpg'

export default function SignInSignUp() {

    const moveImage = () => {
        const img = document.getElementById('movingImage');
        img.style.marginRight = '50%';
        img.style.background = `url(${SignUpImage}) center`;

        const signin = document.getElementById('card-signin');
        signin.classList.remove('card-appear');
        signin.classList.add('card-disappear');
        const signup = document.getElementById('card-signup');
        signup.classList.remove('card-disappear');
        signup.classList.add('card-appear');
    }

    const moveImageBack = () => {
        const img = document.getElementById('movingImage');
        img.style.marginRight = '0%';
        img.style.background = `url(${SignInImage}) center`;

        const signin = document.getElementById('card-signin');
        signin.classList.remove('card-disappear');
        signin.classList.add('card-appear');
        const signup = document.getElementById('card-signup');
        signup.classList.remove('card-appear');
        signup.classList.add('card-disappear');
    }

    const resetInputsBox1 = () => {
        var inputs = document.querySelectorAll('.form-box1 input');
        inputs.forEach(function (input) {
            input.value = '';
        });
        setErrorSignIn(null);
        setSignInEmailError(null);
        setSignInPasswordError(null);
    }

    const resetInputsBox2 = () => {
        var inputs = document.querySelectorAll('.form-box2 input');
        inputs.forEach(function (input) {
            input.value = '';
        });
        setErrorSignUp(null);
        setSignUpEmailError(null);
        setSignUpFullNameError(null);
        setSignUpPhoneNumberError(null);
        setSignUpPasswordError(null);
        setSignUpConfirmError(null);
    }


    const [SignInEmail, setSignInEmail] = useState(null);
    const [SignInPassword, setSignInPassword] = useState(null);

    const [SignInEmailError, setSignInEmailError] = useState(null);
    const [SignInPasswordError, setSignInPasswordError] = useState(null);


    const [SignUpEmail, setSignUpEmail] = useState(null);
    const [SignUpFullName, setSignUpFullName] = useState(null);
    const [SignUpPhoneNumber, setSignUpPhoneNumber] = useState(null);
    const [SignUpPassword, setSignUpPassword] = useState(null);
    const [SignUpConfirm, setSignUpConfirm] = useState(null);

    const [SignUpEmailError, setSignUpEmailError] = useState(null);
    const [SignUpFullNameError, setSignUpFullNameError] = useState(null);
    const [SignUpPhoneNumberError, setSignUpPhoneNumberError] = useState(null);
    const [SignUpPasswordError, setSignUpPasswordError] = useState(null);
    const [SignUpConfirmError, setSignUpConfirmError] = useState(null);


    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorSignIn, setErrorSignIn] = useState(null);
    const [errorSignUp, setErrorSignUp] = useState(null);

    const Login = async (SignInEmail, SignInPassword) => {

        if (!SignInEmail) {
            console.error('Invalid value');
            setSignInEmailError('Email không hợp lệ');
            return;
        }
        if (!SignInPassword) {
            console.error('Invalid value');
            setSignInPasswordError('Mật khẩu không hợp lệ');
            return;
        }

        try {
            const response = await fetch('https://localhost:7166/api/Login/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: SignInEmail, password: SignInPassword }),
            });

            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setToken(data.token);
            setLoading(false);

            localStorage.removeItem('token');
            localStorage.setItem('token', data.token);
            localStorage.removeItem('UserId');
            localStorage.setItem('UserId', data.id);

            if (data.role && data.role === 'User') {
                window.location.href = 'http://localhost:5173/user/information';
            }
        } catch (error) {
            setErrorSignIn(error);
            setLoading(false);
        }
    };

    const SignUp = async (SignUpEmail, SignUpFullName, SignUpPhoneNumber, SignUpPassword, SignUpConfirm) => {

        // if (!SignUpEmail || !SignUpFullName || !SignUpPhoneNumber || !SignUpPassword || !SignUpConfirm) {
        //     console.error('Invalid value');
        //     setSignUpEmailError('Email không hợp lệ');
        //     setSignUpFullNameError('Họ tên không hợp lệ');
        //     setSignUpPhoneNumberError('Số điện thoại không hợp lệ');
        //     setSignUpPasswordError('Mật khẩu không hợp lệ');
        //     setSignUpConfirmError('Mật khẩu không hợp lệ');
        //     return;
        // }
        if (!SignUpEmail) {
            console.error('Invalid email');
            setSignUpEmailError('Email không hợp lệ');
            return;
        }
        if (!SignUpFullName) {
            console.error('Invalid full name');
            setSignUpFullNameError('Họ tên không hợp lệ');
            return;
        }
        if (!SignUpPhoneNumber) {
            console.error('Invalid phone number');
            setSignUpPhoneNumberError('Số điện thoại không hợp lệ');
            return;
        }
        if (!SignUpPassword) {
            console.error('Invalid password');
            setSignUpPasswordError('Mật khẩu không hợp lệ');
            return;
        }
        if (!SignUpConfirm) {
            console.error('Invalid password confirmation');
            setSignUpConfirmError('Xác nhận mật khẩu không hợp lệ');
            return;
        }

        if (!/^\d+$/.test(SignUpPhoneNumber)) {
            console.error('Phone number must contain only digits');
            setSignUpPhoneNumberError('Số điện thoại không hợp lệ');
            return;
        }
        if (SignUpPhoneNumber.length !== 10) {
            console.error('Phone number must contain exactly 10 digits');
            setSignUpPhoneNumberError('Số điện thoại phải có 10 chữ số');
            return;
        }
        if (SignUpPassword.length < 6) {
            console.error('Password must be at least 6 characters long');
            setSignUpPasswordError('Mật khẩu phải ít nhất 6 kí tự');
            return;
        }
        if (SignUpPassword != SignUpConfirm) {
            console.error('Wrong confirm password');
            setSignUpConfirmError('Mật khẩu không khớp');
            return;
        }

        const signupData = {
            id: 14,
            email: SignUpEmail,
            password: SignUpConfirm,
            name: SignUpFullName,
            image: '',
            role: 'User',
            type: 'Regular',
            phoneNumber: SignUpPhoneNumber,
            point: 0,
            description: 'Khách hàng mới',
        };
        console.log('Sign Up Data:', signupData);

        try {
            const response = await fetch('https://localhost:7166/api/User', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signupData),
            });

            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setLoading(false);

            if (data.role && data.role === 'User') {
                window.location.href = 'http://localhost:5173/signinsignup';
            }
        } catch (error) {
            setErrorSignUp(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (SignInEmail && SignInPassword) {
            Login(SignInEmail, SignInPassword);
        }
    }, [SignInEmail, SignInPassword]);

    useEffect(() => {
        if (SignUpEmail && SignUpFullName && SignUpPhoneNumber && SignUpPassword && SignUpConfirm) {
            SignUp(SignUpEmail, SignUpFullName, SignUpPhoneNumber, SignUpPassword, SignUpConfirm);
        }
    }, [SignUpEmail, SignUpFullName, SignUpPhoneNumber, SignUpPassword, SignUpConfirm]);


    const handleSubmitSignIn = (e) => {
        e.preventDefault();
        setErrorSignIn(null);
        setSignInEmailError(null);
        setSignInPasswordError(null);
        const SignInEmail = e.target.SignInEmail.value;
        const SignInPassword = e.target.SignInPassword.value;
        setSignInEmail(SignInEmail);
        setSignInPassword(SignInPassword);
        console.log({ SignInEmail, SignInPassword });
        Login(SignInEmail, SignInPassword);
    };

    const handleSubmitSignUp = (e) => {
        e.preventDefault();
        setErrorSignUp(null);
        setSignUpEmailError(null);
        setSignUpFullNameError(null);
        setSignUpPhoneNumberError(null);
        setSignUpPasswordError(null);
        setSignUpConfirmError(null);
        const SignUpEmail = e.target.SignUpEmail.value;
        const SignUpFullName = e.target.SignUpFullName.value;
        const SignUpPhoneNumber = e.target.SignUpPhoneNumber.value;
        const SignUpPassword = e.target.SignUpPassword.value;
        const SignUpConfirm = e.target.SignUpConfirm.value;
        setSignUpEmail(SignUpEmail);
        setSignUpFullName(SignUpFullName);
        setSignUpPhoneNumber(SignUpPhoneNumber);
        setSignUpPassword(SignUpPassword);
        setSignUpConfirm(SignUpConfirm);
        console.log({ SignUpEmail, SignUpFullName, SignUpPhoneNumber, SignUpPassword, SignUpConfirm });
        SignUp(SignUpEmail, SignUpFullName, SignUpPhoneNumber, SignUpPassword, SignUpConfirm);
    };

    // npm install nodemailer
    // const nodemailer = require('nodemailer');

    // // Tạo transporter
    // const transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: 'your_email@gmail.com', // Email của bạn
    //         pass: 'your_password' // Mật khẩu của bạn hoặc mật khẩu ứng dụng
    //     }
    // });

    // // Cấu hình email
    // const mailOptions = {
    //     from: 'your_email@gmail.com', // Địa chỉ email gửi
    //     to: 'abc@gmail.com', // Địa chỉ email nhận
    //     subject: 'Test Email', // Tiêu đề email
    //     text: 'ThisContent' // Nội dung email
    // };

    // // Gửi email
    // transporter.sendMail(mailOptions, function (error, info) {
    //     if (error) {
    //         console.log('Error:', error);
    //     } else {
    //         console.log('Email sent:', info.response);
    //     }
    // });

    return (
        <div className='user-signin-signup'>
            <div className='signin-signup-container'>
                <div className='card-box'>

                    <div className='card-body card-appear' id='card-signin'>
                        <h1 className='title'>Sign In</h1>
                        <Form className='form-box form-box1' onSubmit={handleSubmitSignIn}>
                            <Form.Group controlId='SignInEmail' className='form-group form-input'>
                                <span className='icon'><i className='fa-solid fa-user' style={{ fontSize: '25px' }}></i></span>
                                <Form.Control className='input' type='email' placeholder='Email' style={{ border: (SignInEmailError || errorSignIn) && '1px solid #dc3545', }} />
                            </Form.Group>
                            <Form.Group controlId='SignInPassword' className='form-group form-input'>
                                <span className='icon'><i className='fa-solid fa-key' style={{ fontSize: '25px' }}></i></span>
                                <Form.Control className='input' type='password' placeholder='Mật khẩu' style={{ border: (SignInPasswordError || errorSignIn) && '1px solid #dc3545', }} />
                            </Form.Group>
                            <a href='#' className='forget-link'><b>Quên mật khẩu?</b></a>
                            {SignInEmailError && <span className='error-message' style={{ color: '#dc3545' }}>{SignInEmailError}</span>}
                            {SignInPasswordError && <span className='error-message' style={{ color: '#dc3545' }}>{SignInPasswordError}</span>}
                            {errorSignIn && <span className='error-message' style={{ color: '#dc3545' }}>Đăng nhập thất bại</span>}
                            <div className='btn-box'>
                                <Button type='submit' className='btn' >ĐĂNG NHẬP</Button>
                                <Button type='reset' className='btn' onClick={resetInputsBox1}>XÓA</Button>
                            </div>
                            <hr />
                            <Button id='signup' className='btn btn-signup' onClick={moveImage}>ĐĂNG KÍ</Button>
                        </Form>
                    </div>

                    <div className='card-body card-disappear' id='card-signup'>
                        <h1 className='title'>Sign Up</h1>
                        <Form className='form-box form-box2' onSubmit={handleSubmitSignUp}>
                            <Form.Group controlId='SignUpEmail' className='form-group form-input'>
                                <span className='icon'><i className='fa-solid fa-envelope' style={{ fontSize: '25px' }}></i></span>
                                <Form.Control className='input' type='email' placeholder='Email' style={{ border: (SignUpEmailError || errorSignUp) && '1px solid #dc3545', }} />
                            </Form.Group>
                            <Form.Group controlId='SignUpFullName' className='form-group form-input'>
                                <span className='icon'><i className='fa-solid fa-user' style={{ fontSize: '25px' }}></i></span>
                                <Form.Control className='input' type='text' placeholder='Họ và tên' style={{ border: (SignUpFullNameError || errorSignUp) && '1px solid #dc3545', }} />
                            </Form.Group>
                            <Form.Group controlId='SignUpPhoneNumber' className='form-group form-input'>
                                <span className='icon'><i className='fa-solid fa-phone' style={{ fontSize: '25px' }}></i></span>
                                <Form.Control className='input' type='text' placeholder='Số điện thoại' style={{ border: (SignUpPhoneNumberError || errorSignUp) && '1px solid #dc3545', }} />
                            </Form.Group>
                            <Form.Group controlId='SignUpPassword' className='form-group form-input'>
                                <span className='icon'><i className='fa-solid fa-key' style={{ fontSize: '25px', color: '#cccccc' }}></i></span>
                                <Form.Control className='input' type='password' placeholder='Mật khẩu' style={{ border: (SignUpPasswordError || errorSignUp) && '1px solid #dc3545', }} />
                            </Form.Group>
                            <Form.Group controlId='SignUpConfirm' className='form-group form-input'>
                                <span className='dobble-icon'><i className='fa-solid fa-key' style={{ fontSize: '25px', color: '#cccccc' }}></i></span>
                                <span className='icon'><i className='fa-solid fa-key' style={{ fontSize: '25px' }}></i></span>
                                <Form.Control className='input' type='password' placeholder='Xác thực mật khẩu' style={{ border: (SignUpConfirmError || errorSignUp) && '1px solid #dc3545', }} />
                            </Form.Group>
                            {SignUpEmailError && <span className='error-message' style={{ color: '#dc3545' }}>{SignUpEmailError}</span>}
                            {SignUpFullNameError && <span className='error-message' style={{ color: '#dc3545' }}>{SignUpFullNameError}</span>}
                            {SignUpPhoneNumberError && <span className='error-message' style={{ color: '#dc3545' }}>{SignUpPhoneNumberError}</span>}
                            {SignUpPasswordError && <span className='error-message' style={{ color: '#dc3545' }}>{SignUpPasswordError}</span>}
                            {SignUpConfirmError && <span className='error-message' style={{ color: '#dc3545' }}>{SignUpConfirmError}</span>}
                            {errorSignUp && <span className='error-message' style={{ color: '#dc3545' }}>Đăng kí thất bại</span>}
                            <div className='btn-box'>
                                <Button type='submit' className='btn'>TẠO TÀI KHOẢN</Button>
                                <Button type='reset' className='btn' onClick={resetInputsBox2}>XÓA</Button>
                            </div>
                            <hr />
                            <Button id='login' className='btn btn-already' onClick={moveImageBack}>ĐÃ CÓ TÀI KHOẢN</Button>
                        </Form>
                    </div>

                    <div className='movingImage' id='movingImage'></div>

                </div>
            </div>
        </div>
    )
}
