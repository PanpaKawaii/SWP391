import React from 'react'
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Form, Button, Card, Row, Col, Modal, Spinner } from 'react-bootstrap';
import './BookingPodDetailContent.css';

import { imagePODs } from '../../assets/listPODs';
import { imageSTOREs } from '../../assets/listSTOREs';
import { imageUTILITIes } from '../../assets/listUTILITIes';

import InnoSpace from '../../BackgroundImage/InnoSpace.png';

// import QRcode from '../BackgroundImage/QRcode.jpg'

export default function BookingPodDetailContent() {

    const [id, setId] = useState(null);
    const UserId = localStorage.getItem('UserId');
    useEffect(() => {
        const UserIdInt = parseInt(UserId, 10);
        setId(UserIdInt);
    }, [UserId]);
    const navigate = useNavigate();

    const [BOOKINGs, setBOOKINGs] = useState(null);
    const [PODs, setPODs] = useState(null);
    const [TYPEs, setTYPEs] = useState(null);
    const [UTILITIes, setUTILITIes] = useState(null);
    const [SLOTs, setSLOTs] = useState([]);
    const [STOREs, setSTOREs] = useState(null);
    const [USERS, setUSERS] = useState(null);
    const [USER, setUSER] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [Picture, setPicture] = useState(null);
    const [IsModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const UserIdInt = parseInt(UserId, 10);
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

                const utilityResponse = await fetch('https://localhost:7166/api/Utility');
                if (!utilityResponse.ok) throw new Error('Network response was not ok');
                const utilityData = await utilityResponse.json();
                setUTILITIes(utilityData);

                const slotResponse = await fetch('https://localhost:7166/api/Slot');
                if (!slotResponse.ok) throw new Error('Network response was not ok');
                const slotData = await slotResponse.json();
                setSLOTs(slotData);

                const storeResponse = await fetch('https://localhost:7166/api/Store');
                if (!storeResponse.ok) throw new Error('Network response was not ok');
                const storeData = await storeResponse.json();
                setSTOREs(storeData);

                const usersResponse = await fetch('https://localhost:7166/api/User/GetIDandName');
                if (!usersResponse.ok) throw new Error('Network response was not ok');
                const usersData = await usersResponse.json();
                setUSERS(usersData);

                const userResponse = await fetch(`https://localhost:7166/api/User/${UserIdInt}`, {
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
    }, []);

    // Lấy Id của Pod được chọn
    const PodId = useParams();
    const Pod = PODs ? PODs.find(obj => { return obj.id == PodId.Id; }) : null;

    // Lấy những Utility của Pod đó
    const AvailableUTILITIes = UTILITIes ? UTILITIes.filter(utility => utility.pods && utility.pods.some(pod => pod.id === Pod.id)) : [];

    // Lấy những Slot có status là Đang hoạt động
    const activeSLOTs = SLOTs ? SLOTs.filter(slot => slot.status === 'Đang hoạt động') : [];

    // Lấy những Slot của Pod đó
    const AvailableSLOTs = activeSLOTs ? activeSLOTs.filter(slot => slot.podId === Pod?.id) : [];

    // Lấy Type của Pod đó
    const thisTYPE = TYPEs ? TYPEs.find(type => type.id === Pod?.typeId) : null;

    // Lấy Store của Pod đó
    const thisSTORE = STOREs ? STOREs.find(store => store.id === Pod?.storeId) : null;


    const currentDate = new Date();
    const [MaxBookingID, setMaxBookingID] = useState(null);
    const [MaxPaymentID, setMaxPaymentID] = useState(null);
    const [date, setDate] = useState(new Date(new Date().getTime() + 7 * 60 * 60 * 1000).toISOString().substring(0, 10));
    const [SlotId, setSlotId] = useState('');
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Thanh toán qua VNPay');
    const [Confirm, setConfirm] = useState(false);

    const [bookingsHaveTheSameDateAndSlot, setBookingsHaveTheSameDateAndSlot] = useState(null);

    // Những Slot được chọn từ AvailableSLOTs
    const selectedSlots = AvailableSLOTs ? AvailableSLOTs.filter(slot => SlotId.includes(slot.id)) : [];
    // Những Booking có cùng Date được chọn (Không bao gồm Booking đã hủy)
    const bookingsHaveTheSameDate = BOOKINGs ? BOOKINGs.filter(booking =>
        booking.date.substring(0, 10) === date && booking.status !== 'Đã hủy'
    ).map(booking => booking.id) : [];
    // Những Slot có cùng Date và giống Slot được chọn
    const getSlotsHaveTheSameDateAndSlot = selectedSlots ? selectedSlots.filter(slot => (slot.bookings).some(booking => bookingsHaveTheSameDate.includes(booking.id))) : [];


    // Những Slot có cùng Date
    const uniqueSlotsHaveTheSameDate = AvailableSLOTs ? AvailableSLOTs.filter(slot => (slot.bookings).some(booking => bookingsHaveTheSameDate.includes(booking.id))) : [];
    // Những Slot có thể chọn
    const unbookedAvailableSLOTs = AvailableSLOTs ? AvailableSLOTs.filter(slot => !uniqueSlotsHaveTheSameDate.some(noslot => noslot.id === slot.id)) : [];


    // Lấy đánh giá của POD dựa trên đánh giá của các Booking
    const getPodBookingRating = (podId) => {
        const booking = BOOKINGs ? BOOKINGs.filter(booking => booking.podId === podId && booking.rating !== null && booking.rating > 0) : [];
        const rating = booking.map(booking => booking.rating).reduce((sum, rating) => sum + rating, 0);
        return (rating / booking.length).toFixed(1);
    };
    // Lấy Feedback của Booking
    const FeedbackBooking = BOOKINGs ? BOOKINGs.filter(booking =>
        // booking.podId == Pod?.id && booking.feedback !== null && booking.feedback !== ''
        booking.podId == Pod?.id && booking.rating !== null && booking.rating > 0
    ) : [];
    // Lấy tên người dùng của Booking
    const getUserNameBooking = (userId) => {
        const user = USERS ? USERS.find(user => user.id === userId) : null;
        return user ? user.name : null;
    };
    // Lấy ảnh người dùng của Booking
    const getUserImageBooking = (userId) => {
        const user = USERS ? USERS.find(user => user.id === userId) : null;
        return user ? user.image : null;
    };

    useEffect(() => {
        setBookingsHaveTheSameDateAndSlot(getSlotsHaveTheSameDateAndSlot)
        console.log('selectedSlots: ', selectedSlots)
        console.log('selectableSlots: ', unbookedAvailableSLOTs)
        console.log('SameDate: ', bookingsHaveTheSameDate)
        console.log('SameDateSlot: ', getSlotsHaveTheSameDateAndSlot)
        console.log('currentDate: ', new Date(new Date().getTime() + 7 * 60 * 60 * 1000).toISOString())
        console.log('selectDate (+7): ', new Date(new Date(date).getTime() + 7 * 60 * 60 * 1000).toISOString())
    }, [SlotId]);




    // Tạo Booking và Payment và PaymentMethod////////////////////////////////////////////////////////////////////////////////////////////////////
    const Booking = async () => {
        if (!MaxBookingID) {
            console.error('Please wait for the system');
            return;
        }
        if (!Pod || !id) {
            console.error('Pod or UserId is not defined');
            return;
        }
        if (!date || SlotId.length === 0) {
            console.error('Date or SlotId is not defined');
            return;
        }
        if (Confirm == false) {
            console.error('You have not confirmed yet');
            return;
        }

        const bookingData = {
            id: MaxBookingID + 1,
            date: date,
            currentDate: new Date(new Date().getTime() + 7 * 60 * 60 * 1000).toISOString(),
            status: 'Chưa diễn ra',
            feedback: '',
            rating: 0,
            podId: Pod.id,
            userId: id,
            slotIds: SlotId.map(id => parseInt(id, 10)),
        };
        console.log('Booking data:', bookingData);

        const paymentData = {
            id: MaxPaymentID + 1,
            method: selectedPaymentMethod,
            amount: Amount,
            date: new Date(new Date().getTime() + 7 * 60 * 60 * 1000).toISOString(),
            status: 'Chưa thanh toán',
            bookingId: MaxBookingID + 1,
        };
        console.log('Payment data:', paymentData);

        const paymentMethodData = {
            id: MaxPaymentID + 1,
            orderId: MaxBookingID + 1,
            fullname: USER.name,
            description: 'Thanh toán qua VNPay cho Booking có ID: ' + MaxBookingID + 1,
            amount: Amount,
            status: 'Chưa thanh toán',
            method: 'Thanh toán qua VNPay',
            createdDate: new Date(new Date().getTime() + 7 * 60 * 60 * 1000).toISOString(),
        };
        console.log('PaymentMethod data:', paymentMethodData);

        console.log('Confirm status:', Confirm);

        try {
            const response = await fetch('https://localhost:7166/api/Booking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(bookingData),
            });

            if (!response.ok) throw new Error('Network response was not ok');
            const result = await response.json();
            console.log('Booking successful:', result);
        } catch (error) {
            console.error('Error during booking:', error);
        }

        if (selectedPaymentMethod && selectedPaymentMethod === 'Thanh toán bằng tiền mặt') {
            try {
                const response = await fetch('https://localhost:7166/api/Payment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify(paymentData),
                });

                if (!response.ok) throw new Error('Network response was not ok');
                const result = await response.json();
                console.log('Creating Payment successful:', result);
            } catch (error) {
                console.error('Error during booking:', error);
            }
        } else {
            try {
                const response = await fetch('https://localhost:7166/api/Payment/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify(paymentMethodData),
                });

                if (!response.ok) throw new Error('Network response was not ok');
                const result = await response.json();
                console.log('Creating PaymentMethod successful:', result);
                window.location.href = result.paymentUrl;
            } catch (error) {
                console.error('Error during booking:', error);
            }
        }
    };

    useEffect(() => {
        if (date && SlotId) {
            Booking(date, SlotId);
        }
    }, [Confirm]);

    const [Amount, setAmount] = useState(0);
    const [IsPopupOpen, setIsPopupOpen] = useState(false);
    const [IsQROpen, setIsQROpen] = useState(false);

    const handleBooking = async (e) => {
        e.preventDefault();
        setIsPopupOpen(true);

        const fetchMaxID = async () => {
            try {
                const bookingResponse = await fetch('https://localhost:7166/api/Booking');
                if (!bookingResponse.ok) throw new Error('Network response was not ok');
                const bookingData = await bookingResponse.json();
                const MaxBookingID = bookingData.reduce((max, booking) => Math.max(max, booking.id), 0);
                setMaxBookingID(MaxBookingID);
                console.log('Max Booking ID:', MaxBookingID);

                const paymentResponse = await fetch('https://localhost:7166/api/Payment');
                if (!paymentResponse.ok) throw new Error('Network response was not ok');
                const paymentData = await paymentResponse.json();
                const MaxPaymentID = paymentData.reduce((max, payment) => Math.max(max, payment.id), 0);
                setMaxPaymentID(MaxPaymentID);
                console.log('Max Payment ID:', MaxPaymentID);

            } catch (error) {
                console.error('Error fetching bookings and payments:', error);
            }
        };
        await fetchMaxID();

        console.log({ date, SlotId, IsPopupOpen, Confirm, selectedPaymentMethod });
        window.location.href = '#popupConfirm';
    };

    const handleConfirm = () => {
        setIsQROpen(true)
        setConfirm(true);
    };

    if (Pod && Pod.status !== 'Đang hoạt động') {
        navigate('/booking/pod')
    }
    if (thisSTORE && thisSTORE.status !== 'Đang hoạt động') {
        navigate('/booking/store')
    }


    if (loading) return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Spinner animation='border' role='status' style={{ width: '200px', height: '200px', fontSize: '50px' }}>
                <span className='visually-hidden'>Loading...</span>
            </Spinner>
        </div>
    );
    if (error) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Error: {error.message}</div>;

    return (
        <div className='user-booking-pod-detail' style={{ position: 'relative' }}>

            {/* <div className='back-button' style={{ position: 'absolute', top: '20px', left: '20px' }}>
                <Link to='/booking/pod'>
                    <i className='fa-solid fa-arrow-left' style={{ color: '#fdbc7f', fontSize: '40px' }}></i>
                </Link>
            </div> */}

            <div className='back-button' style={{ position: 'absolute', top: '20px', left: '20px' }}>
                <i className='fa-solid fa-arrow-left' style={{ color: '#fdbc7f', fontSize: '40px', cursor: 'pointer' }} onClick={() => navigate(-1)}></i>
            </div>

            <div className='booking-pod-detail-container'>
                {Pod ? (
                    <>
                        <h1><b>{Pod.name}</b></h1>
                        <div className='image-detail'>
                            <div className='image-detail-pod'>
                                {/* <img src={imagePODs.find(image => image.id === Pod.id)?.image} alt={Pod.name}></img> */}
                                <img src={Pod.image} alt={Pod.name}></img>
                            </div>
                            <div className='image-detail-2'>
                                <div className='image-detail-2-item-store'>
                                    {/* <img src={imageSTOREs.find(image => image.id === Pod.storeId)?.image} alt={Pod.name}></img> */}
                                    <img src={thisSTORE.image} alt={thisSTORE.name}></img>
                                </div>
                                {AvailableUTILITIes && AvailableUTILITIes.slice(0, 3).map((utility) => (
                                    <div key={utility.id} className='image-detail-2-item-utility' style={{ '--available-utilities-length': Math.ceil((AvailableUTILITIes.length / 4)), '--available-utilities-slice': AvailableUTILITIes.slice(0, 3).length }}>
                                        {/* <img src={imageUTILITIes.find(image => image.id === utility.id)?.image} alt={utility.name}></img> */}
                                        <img src={utility.image} alt={utility.name}></img>
                                    </div>
                                ))}
                                {AvailableUTILITIes && AvailableUTILITIes.slice(3, 6).map((utility) => (
                                    <div key={utility.id} className='image-detail-2-item-utility' style={{ '--available-utilities-length': Math.ceil((AvailableUTILITIes.length / 4)), '--available-utilities-slice': AvailableUTILITIes.slice(3, 6).length }}>
                                        {/* <img src={imageUTILITIes.find(image => image.id === utility.id)?.image} alt={utility.name}></img> */}
                                        <img src={utility.image} alt={utility.name}></img>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='detail-container'>
                            <div className='short-detail'>
                                <h3><b>{thisSTORE ? `${thisSTORE.name}: ${thisSTORE.address} / Liên hệ: ${thisSTORE.contact}` : 'Store not found'}</b></h3>
                                <p>{thisTYPE ? `${thisTYPE.name} / Sức chứa: ${thisTYPE.capacity} người` : 'Type not found'}</p>

                                <div className='favorite'>
                                    <div className='favorite-title'>
                                        <h3><b><i className='fa-regular fa-heart'></i> Yêu thích <i className='fa-regular fa-heart'></i></b></h3>
                                    </div>
                                    <div className='favorite-text'>
                                        {getPodBookingRating(Pod.id) ?
                                            <p><b>Khách đánh giá đây là một trong những căn phòng được yêu thích nhất trên InnoSpace</b></p>
                                            :
                                            <p><b>Đây là một trong những căn phòng tâm đắc nhất của InnoSpace</b></p>
                                        }
                                    </div>
                                    <div className='favorite-rating'>
                                        {getPodBookingRating(Pod.id) && getPodBookingRating(Pod.id) > 0 ?
                                            <span style={{ color: 'gold', fontSize: '2em' }}><b>{getPodBookingRating(Pod.id)}</b><i className='fa-solid fa-star'></i></span>
                                            :
                                            <>
                                                {[...Array(Pod.rating)].map((_, i) => (
                                                    <span key={i} style={{ color: 'gold', fontSize: '1.3em' }}><i className='fa-solid fa-star'></i></span>
                                                ))}
                                                <br />
                                                <span>(ĐƯỢC ĐỀ XUẤT)</span>
                                            </>
                                        }
                                        {/* {Array.from({ length: Pod.rating }, (_, index) => (
                                            <span key={index} style={{ color: 'gold', fontSize: '1.3em' }}><i className='fa-solid fa-star'></i></span>
                                        ))} */}
                                    </div>
                                    <p></p>
                                </div>

                                <h4><b>Tiện nghi có sẵn:</b></h4>
                                <div className='utility-container'>
                                    <Col xs={5} sm={5} md={5} lg={5} xl={5} xxl={5}><p><i className='fa-solid fa-wifi icon'></i> Wifi miễn phí</p></Col>
                                    <Col xs={5} sm={5} md={5} lg={5} xl={5} xxl={5}><p><i className='fa-regular fa-snowflake icon'></i> Máy điều hòa</p></Col>
                                    <Col xs={5} sm={5} md={5} lg={5} xl={5} xxl={5}><p><i className='fa-regular fa-lightbulb icon'></i> Đèn dự phòng</p></Col>
                                    {AvailableUTILITIes.map((utility) => (
                                        <React.Fragment key={utility.id}>
                                            {utility.name === 'Ổ cắm điện' && <Col xs={5} sm={5} md={5} lg={5} xl={5} xxl={5}><p><i className='fa-solid fa-plug icon'></i> {utility.name}</p></Col>}
                                            {utility.name === 'Máy chiếu' && <Col xs={5} sm={5} md={5} lg={5} xl={5} xxl={5}><p><i className='fa-solid fa-chalkboard icon'></i> {utility.name}</p></Col>}
                                            {utility.name === 'Máy pha cà phê' && <Col xs={5} sm={5} md={5} lg={5} xl={5} xxl={5}><p><i className='fa-solid fa-mug-saucer icon'></i> {utility.name}</p></Col>}
                                            {utility.name === 'Hệ thống âm thanh' && <Col xs={5} sm={5} md={5} lg={5} xl={5} xxl={5}><p><i className='fa-solid fa-microphone-lines icon'></i> {utility.name}</p></Col>}
                                            {utility.name === 'Bảng trắng thông minh' && <Col xs={5} sm={5} md={5} lg={5} xl={5} xxl={5}><p><i className='fa-solid fa-tv icon'></i> {utility.name}</p></Col>}
                                        </React.Fragment>
                                    ))}
                                </div>

                                <h4><b>Mô tả về POD:</b></h4>
                                <p>{Pod.description}</p>
                            </div>

                            <div className='payment-card'>
                                <Card>
                                    <div className='payment-card-title'>
                                        <h1><b>{AvailableSLOTs[0]?.price?.toLocaleString('vi-VN')}đ/slot</b></h1>
                                    </div>
                                    <Form className='form-card' onSubmit={handleBooking}>
                                        {id ?
                                            (
                                                <>
                                                    {SlotId.length === 0 ? (
                                                        <Form.Group controlId='BookingDate' className='form-group'>
                                                            <Form.Control className='input' type='date' value={date} onChange={(e) => {
                                                                const selectedDate = e.target.value;
                                                                setDate(selectedDate);
                                                                console.log(selectedDate);
                                                            }} required />
                                                        </Form.Group>
                                                    ) : (
                                                        <div style={{ padding: '3px' }}><h3>Ngày: {date}</h3></div>
                                                    )}

                                                    {date &&
                                                        <Form.Group controlId='BookingSlot' className='form-group'>
                                                            <Row className='row'>
                                                                {/* {unbookedAvailableSLOTs.map((slot, index) => ( */}
                                                                {AvailableSLOTs.map((slot, index) => (
                                                                    <Col key={index} xs={6} sm={6} md={6} lg={6} xl={6} xxl={6} className='col'>
                                                                        <div
                                                                            onClick={() => {
                                                                                const selectedSlot = AvailableSLOTs.find(s => s.id === slot.id);
                                                                                if (unbookedAvailableSLOTs.some(s => s.id === slot.id)) {//
                                                                                    setAmount(prevAmount => prevAmount + (selectedSlot.price * (selectedSlot.selected ? 1 : -1)));
                                                                                    selectedSlot.selected = !selectedSlot.selected; // Toggle selection
                                                                                    console.log(selectedSlot.selected ? `Selected: ${slot.id}` : `Deselected: ${slot.id}`);
                                                                                    setSlotId(prevSlotId => {
                                                                                        const isSelected = prevSlotId.includes(slot.id);
                                                                                        if (isSelected) {
                                                                                            return prevSlotId.filter(id => id !== slot.id); // Remove if already selected
                                                                                        } else {
                                                                                            return [...prevSlotId, slot.id]; // Add if not selected
                                                                                        }
                                                                                    });
                                                                                }//
                                                                            }}
                                                                            style={{
                                                                                cursor: 'pointer',
                                                                                color: unbookedAvailableSLOTs.some(s => s.id === slot.id) ? '#000000' : '#cccccc',
                                                                                backgroundColor: slot.selected ? (bookingsHaveTheSameDateAndSlot.some(slotId => slotId.id == slot.id) ? '#fad7d9' : '#d3f9d8') : '#ffffff',
                                                                                padding: '5px',
                                                                                margin: '5px',
                                                                                border: slot.selected ? (bookingsHaveTheSameDateAndSlot.some(slotId => slotId.id == slot.id) ? '1px solid #dc3545' : '1px solid #28a745') : '1px solid #cccccc',
                                                                                borderRadius: '5px',
                                                                                textAlign: 'center'
                                                                            }}
                                                                        >
                                                                            {`[${slot.name}] ${slot.startTime}:00 - ${slot.endTime}:00`}
                                                                        </div>
                                                                    </Col>
                                                                ))}
                                                                {unbookedAvailableSLOTs && unbookedAvailableSLOTs.length == 0 && <p>Không còn slot trống.</p>}
                                                            </Row>
                                                        </Form.Group>
                                                    }

                                                    <Form.Group controlId='DateValidation' className='form-group'>
                                                        {(() => {
                                                            const selectedDate = new Date(date);
                                                            const currentDate = new Date();
                                                            currentDate.setHours(0, 0, 0, 0); // Reset time to start of day for fair comparison

                                                            if (selectedDate < currentDate) {
                                                                return (
                                                                    <Form.Text className='text-danger'>
                                                                        Vui lòng chọn ngày từ ngày hôm nay trở đi.
                                                                    </Form.Text>
                                                                );
                                                            } else if (selectedDate > new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000)) {
                                                                return (
                                                                    <Form.Text className='text-warning'>
                                                                        Đặt phòng chỉ có thể đặt trong vòng 30 ngày tới.
                                                                    </Form.Text>
                                                                );
                                                            }
                                                            return null;
                                                        })()}
                                                    </Form.Group>

                                                    <Form.Group controlId='PaymentMethod' className='form-group'>
                                                        <Form.Label>Hình thức thanh toán</Form.Label>
                                                        <Form.Control as='select' value={selectedPaymentMethod} onChange={(e) => setSelectedPaymentMethod(e.target.value)}>
                                                            <option value='Thanh toán qua VNPay'>Thanh toán qua VNPay</option>
                                                            {USER && USER.type === 'VIP' && <option value='Thanh toán bằng tiền mặt'>Thanh toán bằng tiền mặt</option>}
                                                        </Form.Control>
                                                    </Form.Group>

                                                    <h2><b>Tổng: <span style={{ color: '#ee4f2e' }}>{Amount.toLocaleString('vi-VN')}đ</span></b></h2>
                                                    {/* <h2><b>Tổng 2: <span style={{ color: '#ee4f2e' }}>{(SlotId.length * AvailableSLOTs[0].price).toLocaleString('vi-VN')}đ</span></b></h2> */}
                                                    {bookingsHaveTheSameDateAndSlot && bookingsHaveTheSameDateAndSlot.length !== 0 && <p style={{ color: '#ff0000' }}>Slot không khả dụng</p>}
                                                    {bookingsHaveTheSameDateAndSlot && bookingsHaveTheSameDateAndSlot.length === 0 &&
                                                        SlotId.length > 0 &&
                                                        new Date(date) >= new Date().setHours(0, 0, 0, 0) &&
                                                        new Date(date) <= new Date().setHours(0, 0, 0, 0) + 30 * 24 * 60 * 60 * 1000 &&
                                                        <Button type='submit' className='btn'>CHỌN</Button>}
                                                </>
                                            )
                                            :
                                            <Link to='/signinsignup'><Button>VUI LÒNG ĐĂNG NHẬP</Button></Link>
                                        }
                                    </Form>
                                </Card>
                            </div>
                        </div>

                        <hr />

                        <div className='big-rating'>

                            {getPodBookingRating(Pod.id) && getPodBookingRating(Pod.id) > 0 ?
                                <>
                                    <h1><b>{getPodBookingRating(Pod.id)}<span style={{ color: 'gold', fontSize: '150px' }}><i className='fa-solid fa-star'></i></span></b></h1>
                                    <h4>Được khách hàng yêu thích</h4>
                                    <p>Một trong căn phòng được yêu thích nhất trên InnoSpace dựa trên điểm xếp hạng, đánh giá và độ tin cậy</p>
                                </>
                                :
                                <>
                                    <h1><b>{Pod.rating}<span style={{ color: 'gold', fontSize: '150px' }}><i className='fa-solid fa-star'></i></span></b></h1>
                                    <h4>Được đề xuất bởi InnoSpace</h4>
                                    <p>Một trong căn phòng được đề xuất bởi InnoSpace dựa trên điểm xếp hạng, đánh giá và độ tin cậy</p>
                                </>
                            }
                        </div>

                        <div className='feedback-container'>
                            <h2><b>Đánh giá của khách hàng:</b></h2>
                            <Row className='feedback-row'>
                                {FeedbackBooking && FeedbackBooking.length !== 0 ? (
                                    FeedbackBooking.map((comment, index) => (
                                        <Col key={index} xs={12} sm={12} md={12} lg={6} xl={4} xxl={4} className='feedback-col'>
                                            <div className='feedback-item'>
                                                <div className='feedback-item-user'>
                                                    <img src={getUserImageBooking(comment.userId)} alt=''></img>
                                                    <div>
                                                        <p><b>{getUserNameBooking(comment.userId)}</b></p>
                                                        <p>{comment.date.substring(0, 10)}</p>
                                                    </div>
                                                </div>
                                                {Array.from({ length: comment.rating }, (_, i) => (
                                                    <span key={i} style={{ color: 'gold', fontSize: '1em' }}><i className='fa-solid fa-star'></i></span>
                                                ))}
                                                <p>{comment.feedback ? comment.feedback : '(Không có đánh giá)'}</p>
                                            </div>
                                        </Col>
                                    ))
                                ) : (
                                    <p>Không có đánh giá nào.</p>
                                )}
                            </Row>
                        </div>

                    </>
                ) : (
                    <span>Không tìm thấy POD nào.</span>
                )}

                {IsPopupOpen && date && SlotId && (
                    <div id='popupConfirm' className='overlay'>
                        <div className='popup'>
                            {/* <img src={imagePODs.find(image => image.id === Pod.id)?.image} alt={Pod.name}></img> */}
                            <img src={Pod.image} alt={Pod.name}></img>
                            <div className='confirm-information'>

                                <h1><b>{Pod.name}</b></h1>

                                {thisSTORE ? <h4><b>{thisSTORE.name}:</b> {thisSTORE.address}</h4> : 'Store not found'}
                                {thisTYPE ? <h4><b>{thisTYPE.name}:</b> Sức chứa {thisTYPE.capacity} người</h4> : 'Type not found'}

                                <h4><b>Ngày nhận phòng:</b> {date}</h4>
                                <h4><b>Phương thức thanh toán:</b> {selectedPaymentMethod}</h4>
                                <h4><b>Giờ nhận phòng: </b></h4>
                                <Row className='row-slot'>
                                    {selectedSlots && selectedSlots.map(slot => (
                                        <Col xs={5} sm={5} md={5} lg={5} xl={5} xxl={5} key={slot.id} className='col'>
                                            {`[${slot.name}] ${slot.startTime}:00 - ${slot.endTime}:00 (${slot.price.toLocaleString('vi-VN')}đ)`}
                                        </Col>
                                    ))}
                                </Row>

                                <div className='button-confirm-amount'>
                                    <h2><b>Tổng: <span style={{ color: '#ee4f2e' }}>{Amount.toLocaleString('vi-VN')}đ</span></b></h2>
                                    {!Confirm ?
                                        <Button type='submit' className='btn' onClick={handleConfirm}>XÁC NHẬN</Button>
                                        :
                                        <Button className='btn' style={{ backgroundColor: '#feecd9' }}>ĐÃ XÁC NHẬN</Button>}
                                </div>
                                {/* <div className='payment-qrcode'>
                                    {IsQROpen && (
                                        <>
                                            <img src={QRcode} alt='QRcode'></img>
                                        </>
                                    )}
                                </div> */}

                                {Confirm === false ? <a className='close' href='#' onClick={() => { setIsPopupOpen(false); setIsQROpen(false); setConfirm(false); }}>&times;</a>
                                    : <Link className='close' to='../../user/booking'>&times;</Link>}
                            </div>
                        </div>
                    </div>
                )}

                {/* {IsModalOpen && (
                    <>
                        <div id='modal' className='overlay'>
                            <div className='popup'>
                                <h1>{Picture.name}</h1>
                                <img src={Picture.image} alt={Picture.name}
                                    style={{
                                        width: '100%',
                                        height: '700px',
                                        objectFit: 'cover',
                                        borderRadius: '10px',
                                        border: '1px solid #cccccc'
                                    }}>
                                </img>
                            </div>
                        </div>
                    </>
                )} */}

            </div>
        </div>
    )
}
