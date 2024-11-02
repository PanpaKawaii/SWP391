import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import './UserBooking.css';

import { imagePODs } from '../../assets/listPODs';

export default function UserBooking() {

    const [id, setId] = useState(null);
    const UserId = localStorage.getItem('UserId');
    useEffect(() => {
        const UserIdInt = parseInt(UserId, 10);
        setId(UserIdInt);
    }, [UserId]);

    const [BOOKINGs, setBOOKINGs] = useState(null);
    const [PODs, setPODs] = useState(null);
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

    // Lấy đánh giá của POD dựa trên đánh giá của các Booking
    const getPodBookingRating = (podId) => {
        const booking = BOOKINGs ? BOOKINGs.filter(booking => booking.podId === podId && booking.rating !== null && booking.rating > 0) : [];
        const rating = booking.map(booking => booking.rating).reduce((sum, rating) => sum + rating, 0);
        return (rating / booking.length).toFixed(1);
    };

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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Ngày bắt đầu:', e.target.startDate.value);
        console.log('Ngày kết thúc:', e.target.endDate.value);

        if (!e.target.startDate.value && !e.target.endDate.value) {
            const dateBOOKINGs = BOOKINGs.filter(booking => booking.userId == id)
                .sort((a, b) => b.id - a.id)
            setFilteredBOOKINGs(dateBOOKINGs);
            return;
        }

        const dateBOOKINGs = BOOKINGs.filter(booking => booking.userId == id)
            .sort((a, b) => b.id - a.id)
            .filter(booking => {
                const bookingDate = new Date(booking.currentDate);
                if (!e.target.startDate.value) {
                    return bookingDate <= new Date(e.target.endDate.value).setHours(23, 59, 59, 999);
                } else if (!e.target.endDate.value) {
                    return bookingDate >= new Date(e.target.startDate.value).setHours(0, 0, 0, 0);
                } else {
                    return bookingDate >= new Date(e.target.startDate.value).setHours(0, 0, 0, 0) && bookingDate <= new Date(e.target.endDate.value).setHours(23, 59, 59, 999);
                }
            });
        setFilteredBOOKINGs(dateBOOKINGs);
        console.log('Date booking:', dateBOOKINGs)
    };

    useEffect(() => {
        if (BOOKINGs && PAYMENTs) {
            filteredBOOKINGs.forEach(booking => {
                handleUpdateBookingStatus(booking.id);
            });
        }
    }, [filteredBOOKINGs]);
    const handleUpdateBookingStatus = (bookingId) => {
        const thisPayment = PAYMENTs.find(payment => payment.bookingId == bookingId);
        const thisBooking = BOOKINGs.find(booking => booking.id == bookingId);
        console.log('This payment:', thisPayment.status);
        console.log('This booking:', thisBooking.status);
        console.log('Date now:', new Date(new Date().getTime() + 7 * 60 * 60 * 1000).toISOString());
        // console.log('Date current date:', new Date(new Date(thisBooking.currentDate).getTime() + 7 * 60 * 60 * 1000).toISOString());
        console.log('Date current date:', thisBooking.currentDate);
        console.log('Time now:', new Date().getTime() + 7 * 60 * 60 * 1000);
        console.log('Time current date:', new Date(thisBooking.currentDate).getTime() + 7 * 60 * 60 * 1000);
        console.log('Minus time:', ((new Date().getTime() + 7 * 60 * 60 * 1000) - (new Date(thisBooking.currentDate).getTime() + 7 * 60 * 60 * 1000)) / 1000 / 60 / 60 / 24);
        if (
            thisPayment.status === 'Chưa thanh toán' &&
            thisBooking.status === 'Chưa diễn ra' &&
            // 15 minutes
            new Date().getTime() - new Date(thisBooking.currentDate).getTime() > 1 * 60 * 1000
        ) {
            UpdateBookingStatus(bookingId);
        }
    };
    const UpdateBookingStatus = async (bookingId) => {
        const thisBooking = BOOKINGs.find(booking => booking.id == bookingId);
        const changeData = {
            id: thisBooking.id,
            date: thisBooking.date,
            currentDate: thisBooking.currentDate,
            status: 'Đã hủy',
            rating: thisBooking.rating,
            feedback: thisBooking.feedback,
            podId: thisBooking.podId,
            userId: thisBooking.userId,
        };
        console.log('Change Information Data:', changeData);

        try {
            const response = await fetch(`https://localhost:7166/api/Booking/${thisBooking.id}`, {
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
        } catch (error) {
            setError(error);
            console.log('Đổi trạng thái thất bại:', error);
            setLoading(false);
        }
    };

    const [countdowns, setCountdowns] = useState({});
    const calculateTimeLeft = (bookingDate) => {
        const now = new Date().getTime();
        const bookingTime = new Date(bookingDate).getTime();
        const timeLimit = 1 * 60 * 1000; // 15 minutes in milliseconds
        const difference = (bookingTime + timeLimit) - now;

        if (difference <= 0) return null;

        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };
    useEffect(() => {
        const timer = setInterval(() => {
            if (filteredBOOKINGs && PAYMENTs) {
                const newCountdowns = {};
                filteredBOOKINGs.forEach(booking => {
                    const payment = PAYMENTs.find(p => p.bookingId === booking.id);
                    if (payment?.status === 'Chưa thanh toán' && booking.status === 'Chưa diễn ra') {
                        const timeLeft = calculateTimeLeft(booking.currentDate);
                        if (timeLeft) {
                            newCountdowns[booking.id] = timeLeft;
                        } else {
                            handleUpdateBookingStatus(booking.id);
                            clearInterval(timer);
                            window.location.reload();
                        }
                    }
                });
                setCountdowns(newCountdowns);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [filteredBOOKINGs, PAYMENTs]);


    if (loading) return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Spinner animation='border' role='status' style={{ width: '200px', height: '200px', fontSize: '50px' }}>
                <span className='visually-hidden'>Loading...</span>
            </Spinner>
        </div>
    );
    if (error) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Error: {error.message}</div>;

    return (
        <div className='user-booking'>
            <div className='booking-date-filter'>
                <Form className='search' onSubmit={handleSubmit}>
                    <Form.Group controlId='startDate' className='form-group'>
                        <Form.Label>Ngày bắt đầu</Form.Label>
                        <Form.Control type='date' name='startDate' />
                    </Form.Group>
                    <Form.Group controlId='endDate' className='form-group'>
                        <Form.Label>Ngày kết thúc</Form.Label>
                        <Form.Control type='date' name='endDate' />
                    </Form.Group>
                    <Button type='submit' className='btn'>TÌM KIẾM <i className='fa-solid fa-magnifying-glass'></i></Button>
                    <Button type='reset' className='btn btn-reset'>ĐẶT LẠI BỘ LỌC</Button>
                </Form>

            </div>
            <Row className='booking-row'>
                {(filteredBOOKINGs && filteredBOOKINGs.length !== 0) ? (
                    filteredBOOKINGs.map((booking, index) => (
                        <Col key={index} xxl={12} className='booking-col'>
                            <div className='booking-card'>
                                <div className='booking-card-container'>
                                    <div className='booking-card-header'>
                                        <h4><b>Ngày đặt:</b> {booking.currentDate}</h4>
                                        <div className='booking-card-status'>
                                            {(() => {
                                                const payment = PAYMENTs?.find(p => p.bookingId === booking.id);
                                                if (payment?.status === 'Chưa thanh toán' && booking.status === 'Chưa diễn ra' && countdowns[booking.id]) {
                                                    return <h4 style={{ backgroundColor: '#dc3545', color: 'white' }}>
                                                        <b>Hủy sau: {countdowns[booking.id]}</b>
                                                    </h4>;
                                                }
                                                return null;
                                            })()}
                                            {/* {(() => {
                                            switch (booking.status) {
                                                case 'Đã xác nhận':
                                                    return <h4 style={{ backgroundColor: '#28a745', color: 'white' }}><b>{booking.status}</b></h4>;
                                                case 'Chờ xác nhận':
                                                    return <h4 style={{ backgroundColor: '#ffc107', color: 'white' }}><b>{booking.status}</b></h4>;
                                                case 'Đã hủy':
                                                    return <h4 style={{ backgroundColor: '#dc3545', color: 'white' }}><b>{booking.status}</b></h4>;
                                                default:
                                                    return booking.status;
                                            }
                                            })()} */}
                                            {(() => {
                                                switch (booking.status) {
                                                    case 'Chưa diễn ra':
                                                        return <h4 style={{ backgroundColor: '#ffc107', color: 'white' }}><b>Chưa diễn ra</b></h4>;
                                                    case 'Đang diễn ra':
                                                        return <h4 style={{ backgroundColor: '#28a745', color: 'white' }}><b>Đang diễn ra</b></h4>;
                                                    case 'Đã kết thúc':
                                                        return <h4 style={{ backgroundColor: '#0dcaf0', color: 'white' }}><b>Đã kết thúc</b></h4>;
                                                    case 'Đã hủy':
                                                        return <h4 style={{ backgroundColor: '#dc3545', color: 'white' }}><b>Đã hủy</b></h4>;
                                                    case 'Đã hoàn tiền':
                                                        return <h4 style={{ backgroundColor: '#fb8b24', color: 'white' }}><b>Đã hoàn tiền</b></h4>;
                                                    default:
                                                        return <h4><b>{booking.status}</b></h4>;
                                                }
                                            })()}
                                        </div>
                                    </div>
                                    <div className='booking-card-body'>
                                        <div className='card-image'>
                                            {/* <img src={imagePODs.find(image => image.id === booking.podId)?.image} alt={getPodName(booking.podId)} /> */}
                                            <img src={getPodImage(booking.podId)} alt={getPodName(booking.podId)} />
                                        </div>
                                        <div className='card-detail'>
                                            <div className='card-information'>
                                                <p className='booking-id'>ID đơn đặt phòng: {booking.id}</p>
                                                <h1><b>{getPodName(booking.podId)}</b></h1>

                                                <div className='card-rating'>
                                                    {getPodBookingRating(booking.podId) && getPodBookingRating(booking.podId) > 0 ?
                                                        <span style={{ color: 'gold', fontSize: '1.3em' }}><b>Đánh giá: {getPodBookingRating(booking.podId)}</b><i className='fa-solid fa-star'></i></span>
                                                        :
                                                        <>
                                                            {[...Array(getPodRating(booking.podId))].map((_, i) => (
                                                                <span key={i} style={{ color: 'gold', fontSize: '1.3em' }}><i className='fa-solid fa-star'></i></span>
                                                            ))}
                                                            <span>(ĐƯỢC ĐỀ XUẤT)</span>
                                                        </>
                                                    }
                                                    {/* {[...Array(getPodRating(booking.podId))].map((_, i) => (
                                                        <span key={i} style={{ color: 'gold', fontSize: '1.3em' }}><i className='fa-solid fa-star'></i></span>
                                                    ))} */}
                                                </div>
                                                <p><b>Loại:</b> {getTypeName(booking.podId)}</p>
                                                <p><b>Địa chỉ:</b> {getStoreName(booking.podId)}, {getStoreAddress(booking.podId)}</p>
                                                {/* <p>Dịch vụ: {getCategoryName(booking.id)}</p> */}
                                            </div>

                                            <div className='card-datetime-amount'>
                                                <div className='card-datetime'>
                                                    <h5><b>Ngày nhận phòng:</b> {booking.date.substring(0, 10)}</h5>
                                                    {/* <div className='slot-name'>
                                                    {getSlots(booking.id).slice(0, 2).map((slot, index) => (
                                                        <span key={index}>
                                                            [{slot.name}] {slot.startTime}:00 - {slot.endTime}:00
                                                        </span>
                                                    ))}
                                                </div>
                                                <div className='slot-name'>
                                                    {getSlots(booking.id).slice(2, 4).map((slot, index) => (
                                                        <span key={index}>
                                                            [{slot.name}] {slot.startTime}:00 - {slot.endTime}:00
                                                        </span>
                                                    ))}
                                                </div> */}

                                                    <Row className='slot-name'>
                                                        {getSlots(booking.id) && getSlots(booking.id).map(slot => (
                                                            <Col xs={5} sm={5} md={5} lg={5} xl={5} xxl={5} key={slot.id} className='col'>
                                                                {`[${slot.name}] ${slot.startTime}:00 - ${slot.endTime}:00`}
                                                            </Col>
                                                        ))}
                                                    </Row>
                                                </div>

                                                <div className='card-amount'>
                                                    <h2><b>Tổng: <span>{getSumPayment(booking.id).toLocaleString('vi-VN')}đ</span></b></h2>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Link to={`../user/booking/${booking.id}`}>
                                    <i className='fa-solid fa-angle-right'></i>
                                </Link>
                            </div>
                        </Col>
                    ))
                ) : (
                    <span style={{ height: '50vh' }}>Không có lịch sử đặt phòng nào.</span>
                )}
            </Row>
        </div>
    )
}
