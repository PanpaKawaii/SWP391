import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Spinner } from 'react-bootstrap';
import './PaymentStatus.css';

export default function PaymentStatus() {

    const [id, setId] = useState(null);
    const UserId = localStorage.getItem('UserId');
    useEffect(() => {
        const UserIdInt = parseInt(UserId, 10);
        setId(UserIdInt);
    }, [UserId]);

    const [USER, setUSER] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [paymentInfo, setPaymentInfo] = useState({});

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const paymentData = {
            amount: parseInt(urlParams.get('vnp_Amount')) / 100,
            bankCode: urlParams.get('vnp_BankCode'),
            bankTranNo: urlParams.get('vnp_BankTranNo'),
            orderInfo: urlParams.get('vnp_OrderInfo'),
            payDate: urlParams.get('vnp_PayDate'),
            responseCode: urlParams.get('vnp_ResponseCode'),
            transactionNo: urlParams.get('vnp_TransactionNo'),
            transactionStatus: urlParams.get('vnp_TransactionStatus'),
            txnRef: urlParams.get('vnp_TxnRef')
        };
        setPaymentInfo(paymentData);
    }, []);

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                try {
                    const userResponse = await fetch(`https://localhost:7166/api/User/GetUser/${id}?id=${id}`);
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
            <Spinner animation='border' role='status' style={{ width: '200px', height: '200px', fontSize: '50px' }}>
                <span className='visually-hidden'>Loading...</span>
            </Spinner>
        </div>
    );
    // if (error) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Error: {error.message}</div>;

    return (
        <div className='payment-status'>
            <div className='payment-status-content'>
                <Card className='payment-status-card'>
                    {paymentInfo.responseCode === '00' && paymentInfo.transactionStatus === '00' ? (
                        <h1><b>THANH TOÁN THÀNH CÔNG</b></h1>
                    ) : (
                        <h1><b>THANH TOÁN THẤT BẠI</b></h1>
                    )}


                    <p>Số tiền: {paymentInfo.amount}</p>
                    <p>Ngân hàng: {paymentInfo.bankCode}</p>
                    <p>Mã giao dịch ngân hàng: {paymentInfo.bankTranNo}</p>
                    <p>Nội dung: {paymentInfo.orderInfo}</p>
                    <p>Ngày giao dịch: {paymentInfo.payDate}</p>
                    <p>Mã phản hồi: {paymentInfo.responseCode}</p>
                    <p>Mã giao dịch: {paymentInfo.transactionNo}</p>
                    <p>Trạng thái giao dịch: {paymentInfo.transactionStatus}</p>
                    <p>Mã đơn hàng: {paymentInfo.txnRef}</p>
                    <br />
                    <p>Ngày giờ toISOString (GMT+7): {new Date(new Date().getTime() + 7 * 60 * 60 * 1000).toISOString().slice(0, 19)}</p>
                    <p>Ngày giờ toISOString: {new Date().toISOString()}</p>
                    <p>Ngày giờ toLocaleString: {new Date().toLocaleString()}</p>

                    <div className='payment-active-button'>
                        <Link to='/'><Button>VỀ TRANG CHỦ</Button></Link>
                        <Link to='/user/booking'><Button>XEM CHI TIẾT</Button></Link>
                    </div>

                </Card>
            </div>
        </div>
    )
}
