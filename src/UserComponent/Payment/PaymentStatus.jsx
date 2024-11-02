import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import './PaymentStatus.css';

export default function PaymentStatus() {

    const [id, setId] = useState(null);
    const UserId = localStorage.getItem('UserId');
    useEffect(() => {
        const UserIdInt = parseInt(UserId, 10);
        setId(UserIdInt);
    }, [UserId]);

    // const [paymentInfo, setPaymentInfo] = useState({});
    const [message, setMessage] = useState('');

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        // const paymentData = {
        //     amount: parseInt(urlParams.get('vnp_Amount')) / 100,
        //     bankCode: urlParams.get('vnp_BankCode'),
        //     bankTranNo: urlParams.get('vnp_BankTranNo'),
        //     orderInfo: urlParams.get('vnp_OrderInfo'),
        //     payDate: urlParams.get('vnp_PayDate'),
        //     responseCode: urlParams.get('vnp_ResponseCode'),
        //     transactionNo: urlParams.get('vnp_TransactionNo'),
        //     transactionStatus: urlParams.get('vnp_TransactionStatus'),
        //     txnRef: urlParams.get('vnp_TxnRef')
        // };
        // setPaymentInfo(paymentData);

        const messageParam = urlParams.get('message');
        setMessage(messageParam);
    }, []);

    return (
        <div className='payment-status'>
            <div className='payment-status-content'>
                <Card className='payment-status-card'>

                    {message &&
                        (decodeURIComponent(message) === 'Thanh toán thành công' ?
                            <>
                                <h1 style={{ color: '#28a745' }}><b>{decodeURIComponent(message)}</b></h1>
                                <p>Ngày thanh toán: {new Date(new Date().getTime() + 7 * 60 * 60 * 1000).toISOString().slice(0, 19)}</p>
                                <p>Phương thức thanh toán: Thanh toán qua VNPay</p>
                            </>
                            :
                            <h1 style={{ color: '#dc3545' }}><b>{decodeURIComponent(message)}</b></h1>
                        )
                    }

                    <br />
                    {/* <p>Ngày giờ toISOString (GMT+7): {new Date(new Date().getTime() + 7 * 60 * 60 * 1000).toISOString().slice(0, 19)}</p>
                    <p>Ngày giờ toISOString: {new Date().toISOString()}</p>
                    <p>Ngày giờ toLocaleString: {new Date().toLocaleString()}</p> */}

                    <div className='payment-active-button'>
                        <Link to='/'><Button>VỀ TRANG CHỦ</Button></Link>
                        <Link to='/user/booking'><Button>XEM CHI TIẾT</Button></Link>
                    </div>

                </Card>
            </div>
        </div>
    )
}
