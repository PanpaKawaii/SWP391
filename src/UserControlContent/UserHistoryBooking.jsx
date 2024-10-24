import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Spinner } from 'react-bootstrap';
import './UserHistoryBooking.css';

import YellowBanana from '../BackgroundImage/YellowBanana.jpg';

export default function UserHistoryBooking() {

    const [id, setId] = useState(null);
    const UserId = localStorage.getItem('UserId');
    useEffect(() => {
        const UserIdInt = parseInt(UserId, 10);
        setId(UserIdInt);
    }, [UserId]);

    const [BOOKINGs, setBOOKINGs] = useState(null);
    const [PODs, setPODs] = useState(null);
    const [UTILITies, setUTILITies] = useState(null);
    const [TYPEs, setTYPEs] = useState(null);
    const [SLOTs, setSLOTs] = useState([]);
    const [STOREs, setSTOREs] = useState(null);
    const [PAYMENTs, setPAYMENTs] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const bookingResponse = await fetch('https://localhost:7166/api/Booking');
                if (!bookingResponse.ok) throw new Error('Network response was not ok');
                const bookingData = await bookingResponse.json();
                setBOOKINGs(bookingData);

                const podResponse = await fetch('https://localhost:7166/api/Pod');
                if (!podResponse.ok) throw new Error('Network response was not ok');
                const podData = await podResponse.json();
                setPODs(podData);

                const utilityResponse = await fetch('https://localhost:7166/api/Utility');
                if (!utilityResponse.ok) throw new Error('Network response was not ok');
                const utilityData = await utilityResponse.json();
                setUTILITies(utilityData);

                const typeResponse = await fetch('https://localhost:7166/api/Type');
                if (!typeResponse.ok) throw new Error('Network response was not ok');
                const typeData = await typeResponse.json();
                setTYPEs(typeData);

                const slotResponse = await fetch('https://localhost:7166/api/Slot');
                if (!slotResponse.ok) throw new Error('Network response was not ok');
                const slotData = await slotResponse.json();
                setSLOTs(slotData);

                const storeResponse = await fetch('https://localhost:7166/api/Store');
                if (!storeResponse.ok) throw new Error('Network response was not ok');
                const storeData = await storeResponse.json();
                setSTOREs(storeData);

                const paymentResponse = await fetch('https://localhost:7166/api/Payment');
                if (!paymentResponse.ok) throw new Error('Network response was not ok');
                const paymentData = await paymentResponse.json();
                setPAYMENTs(paymentData);

                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Lấy những Booking của User này
    const [filteredBOOKINGs, setFilteredBOOKINGs] = useState([]);
    const getFilteredBOOKINGs = id && BOOKINGs ? BOOKINGs.filter(booking => booking.userId == id)
        .sort((a, b) => b.id - a.id) : [];
    useEffect(() => {
        setFilteredBOOKINGs(getFilteredBOOKINGs);
    }, [BOOKINGs]);

    const sortBOOKINGsDate = () => {
        const sortedBOOKINGs = filteredBOOKINGs.sort((a, b) => new Date(b.date) - new Date(a.date));
        setFilteredBOOKINGs(sortedBOOKINGs);
    }

    const getPodName = (podId) => {
        const pod = PODs ? PODs.find(pod => pod.id === podId) : null;
        return pod ? pod.name : null;
    };

    const getPodImage = (podId) => {
        const pod = PODs ? PODs.find(pod => pod.id === podId) : null;
        return pod ? pod.image : null;
    };

    const getPodRating = (podId) => {
        const pod = PODs ? PODs.find(pod => pod.id === podId) : null;
        return pod ? pod.rating : 0;
    };

    const getTypeName = (podId) => {
        const pod = PODs ? PODs.find(pod => pod.id === podId) : null;
        const type = TYPEs ? TYPEs.find(type => type.id === pod.typeId) : null;
        return type ? type.name : null;
    };

    const getSlots = (bookingId) => {
        const slots = SLOTs ? SLOTs.filter(slot =>
            slot.bookings && slot.bookings.some(booking => booking.id === bookingId)
        ) : [];
        return slots;
    };

    const getStoreName = (podId) => {
        const pod = PODs ? PODs.find(pod => pod.id === podId) : null;
        const store = STOREs ? STOREs.find(store => store.id === pod.storeId) : null;
        return store ? store.name : null;
    };

    const getStoreAddress = (podId) => {
        const pod = PODs ? PODs.find(pod => pod.id === podId) : null;
        const store = STOREs ? STOREs.find(store => store.id === pod.storeId) : null;
        return store ? store.address : null;
    };

    const getSumPayment = (bookingId) => {
        const payments = PAYMENTs ? PAYMENTs.filter(payment => payment.bookingId === bookingId) : [];
        const sum = payments.map(payment => payment.amount).reduce((sum, amount) => sum + amount, 0);
        return sum;
    };


    if (loading) return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Spinner animation="border" role="status" style={{ width: '200px', height: '200px', fontSize: '50px' }}>
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );
    if (error) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Error: {error.message}</div>;

    return (
        <div className='user-booking'>
            <Row className='booking-row'>
                {filteredBOOKINGs ? (
                    filteredBOOKINGs.map((booking, index) => (
                        <Col key={index} xxl={12} className='booking-col'>
                            <div className='booking-card'>
                                <div className='booking-card-header'>
                                    <h4>Ngày đặt: {booking.date.substring(0, 10)}</h4>
                                    <p>{(() => {
                                        switch (booking.status) {
                                            case 'Đã xác nhận':
                                                return <span style={{ backgroundColor: '#28a745', color: 'white' }}>{booking.status}</span>;
                                            case 'Chờ xác nhận':
                                                return <span style={{ backgroundColor: '#ffc107', color: 'white' }}>{booking.status}</span>;
                                            case 'Đã hủy':
                                                return <span style={{ backgroundColor: '#dc3545', color: 'white' }}>{booking.status}</span>;
                                            default:
                                                return booking.status;
                                        }
                                    })()}
                                    </p>
                                </div>
                                <div className='booking-card-body'>
                                    <img src={YellowBanana} alt='BookingImage' />
                                    {/* <img src={getPodImage(booking.podId)} alt={getPodName(booking.podId)} /> */}
                                    <div className='card-detail'>
                                        <div className='card-information'>
                                            {/* <p className='booking-id'>Booking ID: {booking.id}</p> */}
                                            <h1><b>{getPodName(booking.podId)}</b></h1>

                                            <div className='card-rating'>
                                                {[...Array(getPodRating(booking.podId))].map((_, i) => (
                                                    <span key={i} style={{ color: 'gold', fontSize: '1.1em' }}><i className='fa-solid fa-star'></i></span>
                                                ))}
                                            </div>
                                            <p>Loại: {getTypeName(booking.podId)}</p>
                                            <p>Địa chỉ: {getStoreName(booking.podId)}, {getStoreAddress(booking.podId)}</p>
                                            {/* <p>Dịch vụ: {getCategoryName(booking.id)}</p> */}
                                        </div>

                                        <div className='card-datetime-amount'>
                                            <div className='card-datetime'>
                                                <h5><b>Ngày nhận phòng:</b> {booking.date.substring(0, 10)}</h5>
                                                <div className='slot-name'>
                                                    {getSlots(booking.id).slice(0, 3).map((slot, index) => (
                                                        <span key={index}>
                                                            {slot.name}
                                                        </span>
                                                    ))}
                                                </div>
                                                <div className='slot-name'>
                                                    {getSlots(booking.id).slice(3, 6).map((slot, index) => (
                                                        <span key={index}>
                                                            {slot.name}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className='card-amount'>
                                                <h2>Tổng: <span>{getSumPayment(booking.id).toLocaleString('vi-VN')}đ</span></h2>
                                            </div>
                                        </div>
                                    </div>

                                    <Link to={`../user/historybooking/${booking.id}`}>
                                        <i className='fa-solid fa-angle-right'></i>
                                    </Link>
                                </div>
                            </div>
                        </Col>
                    ))
                ) : (
                    <span>Không có lịch sử đặt phòng nào.</span>
                )}
            </Row>
        </div>
    )
}
