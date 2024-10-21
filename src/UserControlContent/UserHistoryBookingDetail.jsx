import React from 'react'
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col, Spinner } from 'react-bootstrap';
import './UserControlContent.css';

import YellowBanana from '../BackgroundImage/YellowBanana.jpg';

export default function UserHistoryBookingDetail() {

    const BookingId = useParams();

    const [id, setId] = useState(null);
    const UserId = localStorage.getItem('UserId');
    useEffect(() => {
        const UserIdInt = parseInt(UserId, 10);
        setId(UserIdInt);
    }, [UserId]);
    
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

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

    // const [thisBOOKING, setThisBOOKING] = useState(null);
    // const [thisPOD, setThisPOD] = useState(null);
    // const [thisTYPE, setThisTYPE] = useState(null);
    // const [thisSLOT, setThisSLOT] = useState([]);
    // const [thisSTORE, setThisSTORE] = useState(null);

    // Lấy những Booking của User này
    const filteredBOOKINGs = id && BOOKINGs ? BOOKINGs.filter(booking => booking.userId == id) : [];
    const filteredPAYMENTs = id && PAYMENTs ? PAYMENTs.filter(payment => payment.bookingId == BookingId.Id) : [];

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

    const getPodCapacity = (podId) => {
        const pod = PODs ? PODs.find(pod => pod.id === podId) : null;
        const type = TYPEs ? TYPEs.find(type => type.id === pod.typeId) : null;
        return type ? type.capacity : 0;
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

    const getStoreId = (podId) => {
        const pod = PODs ? PODs.find(pod => pod.id === podId) : null;
        const store = STOREs ? STOREs.find(store => store.id === pod.storeId) : null;
        return store ? store.id : null;
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
        <div className='user-control-center'>
            <div className='user-control-center-container'>

                <div className='user-booking'>
                    <Row className='booking-row'>
                        {filteredPAYMENTs ? (
                            filteredPAYMENTs.map((booking, index) => (
                                <Col key={index} xxl={12} className='booking-col'>
                                    <div className='booking-card'>
                                        <img src={YellowBanana} alt='YellowBanana' />
                                        <div className='card-detail-all'>

                                            <div>
                                                <h3><b>Amount: {booking.amount}</b></h3>
                                                <h1>{new Date().toLocaleDateString()}</h1>
                                                <h1>{currentDateTime.toLocaleString()}</h1>
                                            </div>






                                            <div className='card-information'>
                                                {/* <img src={getPodImage(booking.podId)} alt={getPodName(booking.podId)} /> */}

                                                {/* <div className='card-info'>
                                                    <p className='booking-id'>Booking ID: {booking.id}</p>
                                                    <h3><b>{getPodName(booking.podId)}</b></h3>

                                                    <div className='card-rating-capacity'>
                                                        <div className='rating'>
                                                            {[...Array(getPodRating(booking.podId))].map((_, i) => (
                                                                <span key={i} style={{ color: 'gold', fontSize: '1.1em' }}><i className='fa-solid fa-star'></i></span>
                                                            ))}
                                                        </div>

                                                        <div className='capacity'>
                                                            {getPodCapacity(booking.podId) === 10 ?
                                                                (
                                                                    <span className='capacity-icon' style={{ padding: '5px' }}><i className='fa-solid fa-user' style={{ paddingRight: '5px' }}></i><b> x 10</b></span>
                                                                ) :
                                                                (
                                                                    [...Array(getPodCapacity(booking.podId))].map((_, i) => (
                                                                        <span key={i} className='capacity-icon' style={{ padding: '5px' }}><i className='fa-solid fa-user'></i></span>
                                                                    ))
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                    <p>{getStoreName(booking.podId)}: {getStoreAddress(booking.podId)}</p>
                                                    <p>{getTypeName(booking.podId)}</p>
                                                    <p>Đánh giá: {booking.feedback}</p>
                                                </div> */}
                                            </div>

                                            {/* <div className='card-datetime-amount'>
                                                <div>
                                                    <b>Ngày nhận phòng:</b> {booking.date}
                                                </div>
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
                                                <div className='card-amount'>
                                                    <h4>Tổng: {getSumPayment(booking.id) > 1000000 ? (getSumPayment(booking.id) / 1000000) + ' triệu đồng' :
                                                        getSumPayment(booking.id) > 1000 ? (getSumPayment(booking.id) / 1000) + ' ngàn đồng' :
                                                            getSumPayment(booking.id) + ' đồng'}
                                                    </h4>
                                                    <p>Trạng thái: {(() => {
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
                                                    })()}</p>
                                                </div>
                                            </div> */}

                                            <div className='rebook-button'>
                                                <Link to={`../user/historybooking/${booking.id}`}><Button className='btn btn-detail'>Chi tiết</Button></Link>
                                                <Link to={`../booking/pod/${booking.podId}`}><Button className='btn btn-rebook'>Đặt lại</Button></Link>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            ))
                        ) : (
                            <p>No bookings available.</p>
                        )}
                    </Row>
                </div>
            </div>
        </div>
    )
}
