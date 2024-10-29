import React from 'react'
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Form, Button, Card, Row, Col, Spinner } from 'react-bootstrap';
import './BookingPodDetailContent.css';

import { imagePODs } from '../assets/listPODs';
import { imageSTOREs } from '../assets/listSTOREs';
import { imageUTILITIes } from '../assets/listUTILITIes';

// import QRcode from '../BackgroundImage/QRcode.jpg'

export default function BookingPodDetailContent() {

    const [id, setId] = useState(null);
    const UserId = localStorage.getItem('UserId');
    useEffect(() => {
        const UserIdInt = parseInt(UserId, 10);
        setId(UserIdInt);
    }, [UserId]);

    const [BOOKINGs, setBOOKINGs] = useState(null);
    const [PODs, setPODs] = useState(null);
    const [TYPEs, setTYPEs] = useState(null);
    const [UTILITIes, setUTILITIes] = useState(null);
    const [SLOTs, setSLOTs] = useState([]);
    const [STOREs, setSTOREs] = useState(null);
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
    const filteredSLOTs = SLOTs ? SLOTs.filter(slot => slot.status === 'Đang hoạt động') : [];

    // Lấy những Slot của Pod đó
    const AvailableSLOTs = filteredSLOTs ? filteredSLOTs.filter(slot => slot.podId === Pod?.id) : [];

    // Lấy Type của Pod đó
    const thisTYPE = TYPEs ? TYPEs.find(type => type.id === Pod?.typeId) : null;

    // Lấy Store của Pod đó
    const thisSTORE = STOREs ? STOREs.find(store => store.id === Pod?.storeId) : null;


    const currentDate = new Date();
    const [MaxID, setMaxID] = useState(null);
    const [MaxPaymentID, setMaxPaymentID] = useState(null);
    const [date, setDate] = useState(new Date(currentDate.getTime()).toISOString().substring(0, 10));
    const [SlotId, setSlotId] = useState('');
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Thanh toán qua VNPay');
    const [Confirm, setConfirm] = useState(false);

    const [bookingsHaveTheSameDateAndSlot, setBookingsHaveTheSameDateAndSlot] = useState(null);

    // Những Slot được chọn từ AvailableSLOTs
    const selectedSlots = AvailableSLOTs ? AvailableSLOTs.filter(slot => SlotId.includes(slot.id)) : [];

    // Những Booking có cùng Date được chọn
    const bookingsHaveTheSameDate = BOOKINGs ? BOOKINGs.filter(booking =>
        booking.date.substring(0, 10) === date
    ).map(booking => booking.id) : [];

    // Những Booking có cùng Date và cùng Slot được chọn
    const getBookingsHaveTheSameDateAndSlot = selectedSlots ? selectedSlots.filter(slot => (slot.bookings).some(booking => bookingsHaveTheSameDate.includes(booking.id))) : [];

    useEffect(() => {
        setBookingsHaveTheSameDateAndSlot(getBookingsHaveTheSameDateAndSlot)
        console.log('selectedSlots: ', selectedSlots)
        console.log('SameDate: ', bookingsHaveTheSameDate)
        console.log('SameDateSlot: ', getBookingsHaveTheSameDateAndSlot)
    }, [SlotId]);




    // Tạo Booking và Payment ////////////////////////////////////////////////////////////////////////////////////////////////////
    const Booking = async () => {
        if (!MaxID) {
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
            id: MaxID + 1,
            date: date,
            status: 'Chờ xác nhận',
            feedback: '',
            podId: Pod.id,
            userId: id,
            slotIds: SlotId.map(id => parseInt(id, 10)),
        };
        console.log('Booking data:', bookingData);

        const paymentData = {
            id: MaxPaymentID + 1,
            method: selectedPaymentMethod,
            amount: Amount,
            date: date,
            status: 'Chưa thanh toán',
            bookingId: MaxID + 1,
        };
        console.log('Payment data:', paymentData);

        const paymentMethodData = {
            orderId: MaxPaymentID + 1,
            fullname: 'NGUYEN VAN A',
            description: 'Thanh toán qua VNPay',
            amount: Amount,
            createdDate: new Date().toISOString().substring(0, 10),
        };
        console.log('PaymentMethod data:', paymentMethodData);

        console.log('Confirm status:', Confirm);

        const token = localStorage.getItem('token');
        console.log('Token data:', token);

        try {
            const response = await fetch('https://localhost:7166/api/Booking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(bookingData),
            });

            if (!response.ok) throw new Error('Network response was not ok');
            const result = await response.json();
            console.log('Booking successful:', result);
        } catch (error) {
            console.error('Error during booking:', error);
        }

        try {
            const response = await fetch('https://localhost:7166/api/Payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(paymentData),
            });

            if (!response.ok) throw new Error('Network response was not ok');
            const result = await response.json();
            console.log('Creating Payment successful:', result);
        } catch (error) {
            console.error('Error during booking:', error);
        }

        try {
            const response = await fetch('https://localhost:7166/api/Payment/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
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
                const MaxID = bookingData.reduce((max, booking) => Math.max(max, booking.id), 0);
                setMaxID(MaxID);
                console.log('Max Booking ID:', MaxID);

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

    const navigate = useNavigate();
    if (Pod && Pod.status !== 'Đang hoạt động') {
        navigate('/booking/pod')
    }
    if (thisSTORE && thisSTORE.status !== 'Đang hoạt động') {
        navigate('/booking/store')
    }


    if (loading) return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Spinner animation="border" role="status" style={{ width: '200px', height: '200px', fontSize: '50px' }}>
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );
    if (error) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Error: {error.message}</div>;

    return (

        //[Store] (Id, Name, Address, Contact, Status)
        //[Pod] (Id, Name, Image, Description, Rating, Status, TypeId, StoreId)
        //[Type] (Id, Name, Capacity)
        //[Utility] (Id, Name, Image, Description)
        //[Slot] (Id, Name, StartTime, EndTime, Price, Status, PodId)
        //[Booking] (Id, Date, Status, Feedback, PodId, UserId)

        <div className='POD-booking-pod-detail'>
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
                                    <div key={utility.id} className='image-detail-2-item-utility' style={{ "--available-utilities-length": Math.ceil((AvailableUTILITIes.length / 4)), "--available-utilities-slice": AvailableUTILITIes.slice(0, 3).length }}>
                                        {/* <img src={imageUTILITIes.find(image => image.id === utility.id)?.image} alt={utility.name}></img> */}
                                        <img src={utility.image} alt={utility.name}></img>
                                    </div>
                                ))}
                                {AvailableUTILITIes && AvailableUTILITIes.slice(3, 6).map((utility) => (
                                    <div key={utility.id} className='image-detail-2-item-utility' style={{ "--available-utilities-length": Math.ceil((AvailableUTILITIes.length / 4)), "--available-utilities-slice": AvailableUTILITIes.slice(3, 6).length }}>
                                        {/* <img src={imageUTILITIes.find(image => image.id === utility.id)?.image} alt={utility.name}></img> */}
                                        <img src={utility.image} alt={utility.name}></img>
                                    </div>
                                ))}
                                {/* <div className='image-detail-2-item'>
                                    <img src={imageUTILITIes.find(image => image.id === Pod.id)?.image} alt={Pod.name}></img>
                                </div> */}
                            </div>
                        </div>

                        <div className='detail-container'>
                            <div className='short-detail'>
                                <h3><b>{thisSTORE ? `${thisSTORE.name}: ${thisSTORE.address} / Hotline: ${thisSTORE.contact}` : 'Store not found'}</b></h3>
                                <p>{thisTYPE ? `${thisTYPE.name} / Sức chứa: ${thisTYPE.capacity} người` : 'Type not found'}</p>

                                <div className='favorite'>
                                    <div className='favorite-title'>
                                        <h3><b><i className='fa-solid fa-heart'></i> Yêu thích <i className='fa-solid fa-heart'></i></b></h3>
                                    </div>
                                    <div className='favorite-text'>
                                        <p><b>Khách đánh giá đây là một trong những căn phòng được yêu thích nhất trên InnoSpace</b></p>
                                    </div>
                                    <div className='favorite-rating'>
                                        <h3>{Pod.rating}</h3>
                                        {Array.from({ length: Pod.rating }, (_, index) => (
                                            <span key={index} style={{ color: 'gold', fontSize: '1.3em' }}><i className='fa-solid fa-star'></i></span>
                                        ))}
                                    </div>
                                    <p></p>
                                </div>

                                <h4><b>Tiện nghi có sẵn:</b></h4>
                                <div className='utility-container'>
                                    <Col xs={5} sm={5} md={5} lg={5} xl={5} xxl={5}><p><i className='fa-solid fa-wifi icon'></i> Wifi miễn phí</p></Col>
                                    <Col xs={5} sm={5} md={5} lg={5} xl={5} xxl={5}><p><i className="fa-regular fa-snowflake icon"></i> Máy điều hòa</p></Col>
                                    <Col xs={5} sm={5} md={5} lg={5} xl={5} xxl={5}><p><i className="fa-regular fa-lightbulb icon"></i> Đèn dự phòng</p></Col>
                                    {AvailableUTILITIes.map((utility) => (
                                        <React.Fragment key={utility.id}>
                                            {utility.name === 'Ổ cắm điện' && <Col xs={5} sm={5} md={5} lg={5} xl={5} xxl={5}><p><i className="fa-solid fa-plug icon"></i> {utility.name}</p></Col>}
                                            {utility.name === 'Máy chiếu' && <Col xs={5} sm={5} md={5} lg={5} xl={5} xxl={5}><p><i className="fa-solid fa-chalkboard icon"></i> {utility.name}</p></Col>}
                                            {utility.name === 'Máy pha cà phê' && <Col xs={5} sm={5} md={5} lg={5} xl={5} xxl={5}><p><i className="fa-solid fa-mug-saucer icon"></i> {utility.name}</p></Col>}
                                            {utility.name === 'Hệ thống âm thanh' && <Col xs={5} sm={5} md={5} lg={5} xl={5} xxl={5}><p><i className="fa-solid fa-microphone-lines icon"></i> {utility.name}</p></Col>}
                                            {utility.name === 'Bảng trắng thông minh' && <Col xs={5} sm={5} md={5} lg={5} xl={5} xxl={5}><p><i className="fa-solid fa-tv icon"></i> {utility.name}</p></Col>}
                                        </React.Fragment>
                                    ))}
                                </div>

                                <h4><b>Mô tả về POD:</b></h4>
                                <p>{Pod.description}</p>
                            </div>

                            <div className='payment-card'>
                                <Card>
                                    <div className='payment-card-title'>
                                        <h1><b>{AvailableSLOTs[0].price.toLocaleString('vi-VN')}đ/slot</b></h1>
                                    </div>
                                    <Form className='form-card' onSubmit={handleBooking}>
                                        {SlotId.length === 0 ? (
                                            <Form.Group controlId='BookingDate' className='form-group'>
                                                {/* <Form.Label>Ngày nhận phòng</Form.Label> */}
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
                                                    {AvailableSLOTs.map((slot, index) => (
                                                        <Col key={index} xs={6} sm={6} md={6} lg={6} xl={6} xxl={6} className='col'>
                                                            <div
                                                                onClick={() => {
                                                                    const selectedSlot = AvailableSLOTs.find(s => s.id === slot.id);
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
                                                                }}
                                                                // style={{
                                                                //     cursor: 'pointer',
                                                                //     backgroundColor: slot.selected ? '#d3f9d8' : '#ffffff',
                                                                //     // backgroundColor: bookingsHaveTheSameDateAndSlot.some(slotId => slotId.id == slot.id) ? '#fad7d9' : '#ffffff',
                                                                //     padding: '5px',
                                                                //     margin: '5px',
                                                                //     border: slot.selected ? '1px solid #28a745' : '1px solid #cccccc',
                                                                //     // border: bookingsHaveTheSameDateAndSlot.some(slotId => slotId.id == slot.id) ? '1px solid #ff0000' : '1px solid #cccccc',
                                                                //     borderRadius: '5px'
                                                                // }}
                                                                style={{
                                                                    cursor: 'pointer',
                                                                    backgroundColor: slot.selected ? (bookingsHaveTheSameDateAndSlot.some(slotId => slotId.id == slot.id) ? '#fad7d9' : '#d3f9d8') : '#ffffff',
                                                                    padding: '5px',
                                                                    margin: '5px',
                                                                    border: slot.selected ? (bookingsHaveTheSameDateAndSlot.some(slotId => slotId.id == slot.id) ? '1px solid #ff0000' : '1px solid #28a745') : '1px solid #cccccc',
                                                                    borderRadius: '5px'
                                                                }}
                                                            >
                                                                {`[${slot.name}] ${slot.startTime}:00 - ${slot.endTime}:00`}
                                                            </div>
                                                        </Col>
                                                    ))}
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
                                                {/* <option value='Thanh toán bằng tiền mặt'>Thanh toán bằng tiền mặt</option> */}
                                            </Form.Control>
                                        </Form.Group>

                                        <h2><b>Tổng: {Amount.toLocaleString('vi-VN')}đ</b></h2>

                                        {id ?
                                            (
                                                <>
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
                            <h1><b>{Pod.rating}<span style={{ color: 'gold' }}><i className='fa-solid fa-star'></i></span></b></h1>
                            <h4>Được khách hàng yêu thích</h4>
                            <p>Một trong căn phòng nhà được yêu thích nhất trên InnoSpace dựa trên điểm xếp hạng, đánh giá và độ tin cậy</p>
                        </div>

                        {/* <div>
                            <h3>Đánh giá của khách hàng:</h3>
                            {BOOKINGs && BOOKINGs.filter(booking => booking.podId === Pod.id).map((booking, index) => (
                                <div key={index} style={{
                                    border: '1px solid #cccccc',
                                    borderRadius: '5px',
                                    padding: '10px',
                                    margin: '10px 0'
                                }}>
                                    <div className='booking-pod-detail-item'>
                                        <p><b>Tên người dùng:</b> {booking.id}</p>
                                        <p><b>Ngày đặt phòng:</b> {booking.date.substring(0, 10)}</p>
                                        <p><b>Trạng thái:</b> {booking.status}</p>
                                        <p><b>Đánh giá:</b> {booking.feedback || 'Không có đánh giá'}</p>
                                    </div>
                                </div>
                            ))}
                        </div> */}

                    </>
                ) : (
                    <span>Không tìm thấy POD nào.</span>
                )}


                {/*
                [Store] (Id, Name, Address, Contact, Status)
                [Pod] (Id, Name, Image, Description, Rating, Status, TypeId, StoreId)
                [Type] (Id, Name, Capacity)
                [Utility] (Id, Name, Image, Description)
                [Slot] (Id, Name, StartTime, EndTime, Price, Status, PodId)
                [Booking] (Id, Date, Status, Feedback, PodId, UserId)
                */}

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
                                    <h2><b>Tổng: {Amount.toLocaleString('vi-VN')}đ</b></h2>
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

            </div>
        </div>
    )
}
