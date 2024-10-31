import React from 'react'
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, Form, Button, Tabs, Tab, Spinner } from 'react-bootstrap';
import './UserBookingDetail.css';

import MyTabs from './MyTabs';

import { imagePODs } from '../../assets/listPODs';

export default function UserBookingDetail() {

    const BookingId = useParams();

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
    const [BOOKINGORDERs, setBOOKINGORDERs] = useState(null);
    const [PRODUCTs, setPRODUCTs] = useState(null);
    const [CATEGORYs, setCATEGORYs] = useState(null);
    const [USER, setUSER] = useState(null);
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

                const bookingOrderResponse = await fetch('https://localhost:7166/api/BookingOrder');
                if (!bookingOrderResponse.ok) throw new Error('Network response was not ok');
                const bookingOrderData = await bookingOrderResponse.json();
                setBOOKINGORDERs(bookingOrderData);

                const productResponse = await fetch('https://localhost:7166/api/Product');
                if (!productResponse.ok) throw new Error('Network response was not ok');
                const productData = await productResponse.json();
                setPRODUCTs(productData);

                const categoryResponse = await fetch('https://localhost:7166/api/Category');
                if (!categoryResponse.ok) throw new Error('Network response was not ok');
                const categoryData = await categoryResponse.json();
                setCATEGORYs(categoryData);

                const userResponse = await fetch(`https://localhost:7166/api/User/GetUser/${parseInt(UserId, 10)}?id=${parseInt(UserId, 10)}`);
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

    // Lấy Booking này
    const thisBOOKING = BOOKINGs ? BOOKINGs.find(booking => booking.id == BookingId.Id) : null;
    // Lấy những BookingOrder của Booking này
    const filteredBOOKINGORDERs = BOOKINGORDERs ? BOOKINGORDERs.filter(bookingOrder => bookingOrder.bookingId == BookingId.Id) : null;
    // Lấy Pod của Booking này
    const thisPOD = PODs ? PODs.find(pod => pod.id == thisBOOKING.podId) : null;
    // Lấy Slot của Booking này
    const thisSLOTs = SLOTs ? SLOTs.filter(slot => slot.bookings && slot.bookings.some(booking => booking.id == thisBOOKING.id)) : [];
    // Lấy Store của Pod này
    const thisSTORE = STOREs ? STOREs.find(store => store.id == thisPOD.storeId) : null;

    // Lấy đánh giá của POD dựa trên đánh giá của các Booking
    const getPodBookingRating = (podId) => {
        const booking = BOOKINGs ? BOOKINGs.filter(booking => booking.podId === podId && booking.rating !== null && booking.rating > 0) : [];
        const rating = booking.map(booking => booking.rating).reduce((sum, rating) => sum + rating, 0);
        return rating / booking.length;
    };

    const getSlotPrice = (slotId) => {
        const slot = SLOTs ? SLOTs.find(slot => slot.id === slotId) : null;
        return slot ? slot.price : null;
    };

    const getProductName = (productId) => {
        const product = PRODUCTs ? PRODUCTs.find(product => product.id == productId) : null;
        return product ? product.name : null;
    };

    const getCategoryName = (productId) => {
        const product = PRODUCTs ? PRODUCTs.find(product => product.id == productId) : null;
        const category = CATEGORYs ? CATEGORYs.find(category => category.id == product.categoryId) : null;
        return category ? category.name : null;
    };

    const getProductDescription = (productId) => {
        const product = PRODUCTs ? PRODUCTs.find(product => product.id == productId) : null;
        return product ? product.description : null;
    };

    const getProductPrice = (productId) => {
        const product = PRODUCTs ? PRODUCTs.find(product => product.id == productId) : null;
        return product ? product.price : null;
    };

    const getBookingOrderAmount = (bookingOrderId) => {
        const bookingOrder = filteredBOOKINGORDERs ? filteredBOOKINGORDERs.find(bookingOrder => bookingOrder.id === bookingOrderId) : null;
        return bookingOrder ? bookingOrder.amount : null;
    };

    const getBookingOrderQuantity = (bookingOrderId) => {
        const bookingOrder = filteredBOOKINGORDERs ? filteredBOOKINGORDERs.find(bookingOrder => bookingOrder.id == bookingOrderId) : null;
        return bookingOrder ? bookingOrder.quantity : null;
    };

    const getBookingOrderStatus = (bookingOrderId) => {
        const bookingOrder = filteredBOOKINGORDERs ? filteredBOOKINGORDERs.find(bookingOrder => bookingOrder.id == bookingOrderId) : null;
        return bookingOrder ? bookingOrder.status : null;
    };

    const getBookingOrderDate = (bookingOrderId) => {
        const bookingOrder = filteredBOOKINGORDERs ? filteredBOOKINGORDERs.find(bookingOrder => bookingOrder.id == bookingOrderId) : null;
        return bookingOrder ? bookingOrder.date : null;
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

    const getBookingAmount = (bookingId) => {
        const payments = PAYMENTs ? PAYMENTs.filter(payment => payment.bookingId === bookingId) : [];
        return payments[0].amount;
    };

    const getBookingPaymentStatus = (bookingId) => {
        const payments = PAYMENTs ? PAYMENTs.filter(payment => payment.bookingId === bookingId) : [];
        return payments[0].status;
    };

    const getSumBookingAmount = (bookingId) => {
        const payments = PAYMENTs ? PAYMENTs.filter(payment => payment.bookingId === bookingId) : [];
        return payments.reduce((sum, payment) => sum + payment.amount, 0);
    };

    const getSumSuccessBookingAmount = (bookingId) => {
        const payments = PAYMENTs ? PAYMENTs.filter(payment => payment.bookingId === bookingId && payment.status === 'Đã thanh toán') : [];
        return payments.reduce((sum, payment) => sum + payment.amount, 0);
    };

    const getBookingPaymentDate = (bookingId) => {
        const payments = PAYMENTs ? PAYMENTs.filter(payment => payment.bookingId === bookingId) : [];
        return payments[0].date;
    };

    const getBookingOrderPaymentMethod = (BookingId) => {
        const payments = PAYMENTs ? PAYMENTs.filter(payment => payment.bookingId === BookingId) : [];
        return payments[0].method;
    };

    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    useEffect(() => {
        setRating(thisBOOKING ? thisBOOKING.rating : 0);
        setFeedback(thisBOOKING ? thisBOOKING.feedback : '');
    }, [thisBOOKING]);
    const handleSubmitFeedback = (e) => {
        e.preventDefault();
        console.log('Rating:', rating);
        console.log('Feedback submitted:', feedback);
        SubmitFeedback(rating, feedback);
    }
    const SubmitFeedback = async (SubmitRating, SubmitFeedback) => {

        const changeData = {
            id: thisBOOKING.id,
            date: thisBOOKING.date,
            status: thisBOOKING.status,
            rating: SubmitRating,
            feedback: SubmitFeedback,
            podId: thisBOOKING.podId,
            userId: thisBOOKING.userId,
        };
        console.log('Change Information Data:', changeData);

        try {
            const response = await fetch(`https://localhost:7166/api/Booking/${thisBOOKING.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('Token')}`
                },
                body: JSON.stringify(changeData),
            });

            if (!response.ok) throw new Error('Network response was not ok');
            // const data = await response.json();
            setLoading(false);
            alert('Đánh giá thành công');
        } catch (error) {
            setError(error);
            console.log('Đánh giá thất bại:', error);
            setLoading(false);
        }
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
        <div className='user-booking-detail'>
            <div className='booking-card'>
                <div className='booking-card-header'>
                    <h4><b>Ngày đặt:</b> {thisBOOKING.currentDate}</h4>
                    {(() => {
                        switch (thisBOOKING.status) {
                            case 'Đã xác nhận':
                                return <h4 style={{ backgroundColor: '#28a745', color: 'white' }}><b>Đã diễn ra</b></h4>;
                            case 'Chờ xác nhận':
                                return <h4 style={{ backgroundColor: '#ffc107', color: 'white' }}><b>Chưa diễn ra</b></h4>;
                            case 'Đã hủy':
                                return <h4 style={{ backgroundColor: '#dc3545', color: 'white' }}><b>Đã hủy</b></h4>;
                            default:
                                return thisBOOKING.status;
                        }
                    })()}
                </div>
                <Row className='booking-row'>
                    <Col xxl={12} className='booking-col'>
                        <div className='booking-card-body'>
                            <div className='card-image'>
                                {/* <img src={imagePODs.find(image => image.id === thisBOOKING.podId)?.image} alt={getPodName(thisBOOKING.podId)} /> */}
                                <img src={getPodImage(thisBOOKING.podId)} alt={getPodName(thisBOOKING.podId)} />
                            </div>
                            <div className='card-detail'>
                                <div className='card-information'>
                                    <p className='booking-id'>ID: {thisBOOKING.id}</p>
                                    <h1><b>{getPodName(thisBOOKING.podId)}</b></h1>

                                    <div className='card-rating-capacity'>
                                        <div className='rating'>
                                            {getPodBookingRating(thisBOOKING.podId) ?
                                                <span style={{ color: 'gold', fontSize: '1.3em' }}><b>Đánh giá: {getPodBookingRating(thisBOOKING.podId)}</b><i className='fa-solid fa-star'></i></span>
                                                :
                                                <>
                                                    {[...Array(getPodRating(thisBOOKING.podId))].map((_, i) => (
                                                        <span key={i} style={{ color: 'gold', fontSize: '1.3em' }}><i className='fa-solid fa-star'></i></span>
                                                    ))}
                                                    <span>(ĐƯỢC ĐỀ XUẤT)</span>
                                                </>
                                            }
                                            {/* {[...Array(getPodRating(thisBOOKING.podId))].map((_, i) => (
                                                <span key={i} style={{ color: 'gold', fontSize: '1.3em' }}><i className='fa-solid fa-star'></i></span>
                                            ))} */}
                                        </div>

                                        {/* <div className='capacity'>
                                            {getPodCapacity(thisBOOKING.podId) === 10 ?
                                                (
                                                    <span className='capacity-icon' style={{ padding: '5px' }}><i className='fa-solid fa-user' style={{ paddingRight: '5px' }}></i><b> x 10</b></span>
                                                ) :
                                                (
                                                    [...Array(getPodCapacity(thisBOOKING.podId))].map((_, i) => (
                                                        <span key={i} className='capacity-icon' style={{ padding: '5px' }}><i className='fa-solid fa-user'></i></span>
                                                    ))
                                                )
                                            }
                                        </div> */}
                                    </div>
                                    <p><b>Loại:</b> {getTypeName(thisBOOKING.podId)}</p>
                                    <p><b>Địa chỉ:</b> {getStoreName(thisBOOKING.podId)}, {getStoreAddress(thisBOOKING.podId)}</p>
                                </div>
                                <div className='card-amount-method-datetime-status'>
                                    <p><b>Ngày nhận phòng:</b> {thisBOOKING.date.substring(0, 10)}</p>
                                    <Row className='slot-name'>
                                        {getSlots(thisBOOKING.id) && getSlots(thisBOOKING.id).map(slot => (
                                            <Col xs={5} sm={5} md={5} lg={5} xl={5} xxl={5} key={slot.id} className='col'>
                                                {`[${slot.name}] ${slot.startTime}:00 - ${slot.endTime}:00`}
                                            </Col>
                                        ))}
                                    </Row>
                                    <div className='card-amount'>
                                        <p><b>Thành tiền:</b> {getBookingAmount(thisBOOKING.id).toLocaleString('vi-VN')}đ</p>
                                    </div>
                                    <div className='card-method'>
                                        <p>{getBookingOrderPaymentMethod(thisBOOKING.id)}</p>
                                    </div>
                                    <div className='card-datetime-status'>
                                        <div className='card-datetime'>
                                            <p><b>Ngày thanh toán:</b> {getBookingPaymentDate(thisBOOKING.id).substring(0, 10)}</p>
                                        </div>
                                        <div className='card-status'>
                                            {(() => {
                                                switch (getBookingPaymentStatus(thisBOOKING.id)) {
                                                    case 'Đã thanh toán':
                                                        return <h4 style={{ color: '#28a745' }}><b>{getBookingPaymentStatus(thisBOOKING.id)}</b></h4>;
                                                    case 'Chưa thanh toán':
                                                        return <h4 style={{ color: '#ffc107' }}><b>{getBookingPaymentStatus(thisBOOKING.id)}</b></h4>;
                                                    default:
                                                        return getBookingPaymentStatus(thisBOOKING.id);
                                                }
                                            })()}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </Col>
                </Row>
                <Row className='booking-row'>
                    {filteredBOOKINGORDERs ? (
                        filteredBOOKINGORDERs.map((bookingOrder, index) => (
                            <Col key={index} xxl={12} className='booking-col'>
                                <div className='bookingorder-card-body'>
                                    {/* <div className='card-image'> */}
                                    {/* <img src={YellowBanana} alt='BookingImage' /> */}
                                    {/* <img src={getPodImage(booking.podId)} alt={getPodName(booking.podId)} /> */}
                                    {/* </div> */}
                                    <div className='card-detail'>
                                        <div className='card-information'>
                                            <h3><b>{getProductName(bookingOrder.productId)}</b></h3>
                                            <p><b>Loại dịch vụ:</b> {getCategoryName(bookingOrder.productId)}</p>
                                            <p><b>Mô tả:</b> {getProductDescription(bookingOrder.productId)}</p>
                                            <p>[<b>Giá:</b> {getProductPrice(bookingOrder.productId).toLocaleString('vi-VN')}đ] x [<b>Số lượng:</b> {getBookingOrderQuantity(bookingOrder.id)}]</p>
                                        </div>

                                        <div className='card-amount-method-datetime-status'>
                                            <div className='card-amount'>
                                                <p><b>Thành tiền:</b> {getBookingOrderAmount(bookingOrder.id).toLocaleString('vi-VN')}đ</p>
                                            </div>
                                            <div className='card-method'>
                                                <p>Thanh toán bằng tiền mặt</p>
                                            </div>
                                            <div className='card-datetime-status'>
                                                <div className='card-datetime'>
                                                    <p><b>Ngày thanh toán:</b> {getBookingOrderDate(bookingOrder.id).substring(0, 10)}</p>
                                                </div>
                                                <div className='card-status'>
                                                    {(() => {
                                                        switch (getBookingOrderStatus(bookingOrder.id)) {
                                                            case 'Đã thanh toán':
                                                                return <h4 style={{ color: '#28a745' }}><b>{getBookingOrderStatus(bookingOrder.id)}</b></h4>;
                                                            case 'Chưa thanh toán':
                                                                return <h4 style={{ color: '#ffc107' }}><b>{getBookingOrderStatus(bookingOrder.id)}</b></h4>;
                                                            default:
                                                                return getBookingOrderStatus(bookingOrder.id);
                                                        }
                                                    })()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        ))
                    ) : (
                        <span style={{ height: '50vh' }}>Không có lịch sử đặt phòng nào.</span>
                    )}
                </Row>
                <div className='booking-card-footer'>
                    <div className='card-amount'>
                        <h4><b>Tổng tiền: <span className='total-amount'>{getSumBookingAmount(thisBOOKING.id).toLocaleString('vi-VN')}đ</span></b></h4>
                        <h4><b>Đã thanh toán: <span className='success-amount'>{getSumSuccessBookingAmount(thisBOOKING.id).toLocaleString('vi-VN')}đ</span></b></h4>
                    </div>
                    <div className='button-footer'>
                        {getBookingPaymentStatus(thisBOOKING.id) === 'Đã thanh toán' ? (
                            <div>
                                <h3>Đánh giá của bạn:</h3>
                                <Form className='rating-form' onSubmit={handleSubmitFeedback}>

                                    <div>
                                        <Form.Group controlId='formRating' className='form-group'>
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i}
                                                    style={{
                                                        color: (rating >= i + 1) ? 'gold' : '#cccccc',
                                                        fontSize: '1.1em',
                                                        cursor: 'pointer'
                                                    }}
                                                    onClick={() => setRating(i + 1)}
                                                // onMouseEnter={() => setRating(i + 1)}
                                                // onMouseLeave={() => setRating(0)}
                                                >
                                                    <i className='fa-solid fa-star'></i>
                                                </span>
                                            ))}
                                        </Form.Group>

                                        <Form.Group controlId='formFeedback' className='form-group'>
                                            <Form.Control type='text' placeholder='Nhập phản hồi của bạn' value={feedback} onChange={(e) => setFeedback(e.target.value)} />
                                        </Form.Group>
                                    </div>

                                    <Button type='submit' className='btn btn-feedback'>GỬI</Button>

                                </Form>
                            </div>
                        ) : <div></div>}
                        <div className='rebook-button-container'>
                            <Link to={`/booking/pod/${thisPOD.id}`} className='link-item'><Button className='rebook-button'>ĐẶT LẠI</Button></Link>
                        </div>
                    </div>
                </div>

                <Tabs defaultActiveKey='booking' id='uncontrolled-tab-example' className='mb-3' style={{ height: 'auto' }}>
                    <Tab eventKey='booking' title='Đặt phòng'>
                        <h1><b>ĐƠN ĐẶT PHÒNG</b></h1>
                        <p><b>ID đơn đặt phòng:</b> {thisBOOKING.id}</p>
                        <p><b>Ngày đặt:</b> {thisBOOKING.currentDate}</p>
                        <p><b>Trạng thái:</b> {thisBOOKING.status}</p>
                        <p><b>Tổng tiền: <span className='total-amount' style={{ color: '#ee4f2e' }}>{getSumBookingAmount(thisBOOKING.id).toLocaleString('vi-VN')}đ</span></b></p>
                    </Tab>
                    <Tab eventKey='slot' title='Slot'>
                        <h1><b>SLOT ĐÃ ĐẶT</b></h1>
                        <p><b>Ngày nhận phòng:</b> {thisBOOKING.date.substring(0, 10)}</p>
                        <Row className='slot-name'>
                            {thisSLOTs && thisSLOTs.map(slot => (
                                <Col xs={5} sm={5} md={5} lg={5} xl={5} xxl={5} key={slot.id} className='col'>
                                    <p><b>ID slot:</b> {slot.id}</p>
                                    <p><b>Tên slot:</b> {slot.name}</p>
                                    <p><b>Giờ bắt đầu:</b> {thisBOOKING.date.substring(0, 10)} {slot.startTime}:00</p>
                                    <p><b>Giờ kết thúc:</b> {thisBOOKING.date.substring(0, 10)} {slot.endTime}:00</p>
                                    <p><b>Giá slot: <span style={{ color: '#ee4f2e' }}>{slot.price.toLocaleString('vi-VN')}đ</span></b></p>
                                </Col>
                            ))}
                        </Row>
                    </Tab>
                    <Tab eventKey='order' title='Dịch vụ'>
                        <h1><b>DỊCH VỤ ĐÃ ĐẶT</b></h1>
                        <Row className='booking-row'>
                            {filteredBOOKINGORDERs ? (
                                filteredBOOKINGORDERs.map((bookingOrder, index) => (
                                    <Col key={index} xxl={12} className='booking-col'>
                                        <h3><b>{getProductName(bookingOrder.productId)}</b></h3>
                                        <p><b>Loại dịch vụ:</b> {getCategoryName(bookingOrder.productId)}</p>
                                        <p><b>Mô tả:</b> {getProductDescription(bookingOrder.productId)}</p>
                                        <p>[<b>Giá:</b> {getProductPrice(bookingOrder.productId).toLocaleString('vi-VN')}đ] x [<b>Số lượng:</b> {getBookingOrderQuantity(bookingOrder.id)}]</p>
                                        <p><b>Thành tiền: <span style={{ color: '#ee4f2e' }}>{getBookingOrderAmount(bookingOrder.id).toLocaleString('vi-VN')}đ</span></b></p>
                                    </Col>
                                ))
                            ) : (
                                <span style={{ height: '50vh' }}>Không có lịch sử đặt phòng nào.</span>
                            )}
                        </Row>
                    </Tab>
                    <Tab eventKey='user' title='Thông tin của bạn'>
                        <h1><b>THÔNG TIN CỦA BẠN</b></h1>
                        <p><b>Họ tên:</b> {USER.name}</p>
                        <p><b>Số điện thoại:</b> {USER.phoneNumber}</p>
                        <p><b>Email:</b> {USER.email}</p>
                        <p><b>Danh hiệu:</b> {USER.type}</p>
                        <p><b>Mô tả:</b> {USER.description}</p>
                    </Tab>
                    <Tab eventKey='payment' title='Thanh toán'>
                        <h1><b>THÔNG TIN THANH TOÁN</b></h1>
                        <Row className='booking-row'>
                            <Col xxl={12} className='booking-col'>
                                <div className='bookingorder-card-body'>
                                    <div className='card-detail'>
                                        <div>
                                            <h2><b>{thisPOD.name}</b></h2>
                                        </div>
                                        <div className='card-amount-method-datetime-status'>
                                            <div className='card-amount'>
                                                <p><b>Thành tiền:</b> {getBookingAmount(thisBOOKING.id).toLocaleString('vi-VN')}đ</p>
                                            </div>
                                            <div className='card-method'>
                                                <p>{getBookingOrderPaymentMethod(thisBOOKING.id)}</p>
                                            </div>
                                            <div className='card-datetime-status'>
                                                <div className='card-datetime'>
                                                    <p><b>Ngày thanh toán:</b> {getBookingPaymentDate(thisBOOKING.id).substring(0, 10)}</p>
                                                </div>
                                                <div className='card-status'>
                                                    {(() => {
                                                        switch (getBookingPaymentStatus(thisBOOKING.id)) {
                                                            case 'Đã thanh toán':
                                                                return <h4 style={{ color: '#28a745' }}><b>{getBookingPaymentStatus(thisBOOKING.id)}</b></h4>;
                                                            case 'Chưa thanh toán':
                                                                return <h4 style={{ color: '#ffc107' }}><b>{getBookingPaymentStatus(thisBOOKING.id)}</b></h4>;
                                                            default:
                                                                return getBookingPaymentStatus(thisBOOKING.id);
                                                        }
                                                    })()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row className='booking-row'>
                            {filteredBOOKINGORDERs ? (
                                filteredBOOKINGORDERs.map((bookingOrder, index) => (
                                    <Col key={index} xxl={12} className='booking-col'>
                                        <div className='bookingorder-card-body'>
                                            <div className='card-detail'>
                                                <div>
                                                    <h2><b>{getProductName(bookingOrder.productId)}</b></h2>
                                                </div>
                                                <div className='card-amount-method-datetime-status'>
                                                    <div className='card-amount'>
                                                        <p><b>Thành tiền:</b> {getBookingOrderAmount(bookingOrder.id).toLocaleString('vi-VN')}đ</p>
                                                    </div>
                                                    <div className='card-method'>
                                                        <p>Thanh toán bằng tiền mặt</p>
                                                    </div>
                                                    <div className='card-datetime-status'>
                                                        <div className='card-datetime'>
                                                            <p><b>Ngày thanh toán:</b> {getBookingOrderDate(bookingOrder.id).substring(0, 10)}</p>
                                                        </div>
                                                        <div className='card-status'>
                                                            {(() => {
                                                                switch (getBookingOrderStatus(bookingOrder.id)) {
                                                                    case 'Đã thanh toán':
                                                                        return <h4 style={{ color: '#28a745' }}><b>{getBookingOrderStatus(bookingOrder.id)}</b></h4>;
                                                                    case 'Chưa thanh toán':
                                                                        return <h4 style={{ color: '#ffc107' }}><b>{getBookingOrderStatus(bookingOrder.id)}</b></h4>;
                                                                    default:
                                                                        return getBookingOrderStatus(bookingOrder.id);
                                                                }
                                                            })()}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                ))
                            ) : (
                                <span style={{ height: '50vh' }}>Không có lịch sử đặt phòng nào.</span>
                            )}
                        </Row>
                    </Tab>
                    <Tab eventKey='store' title='Cửa hàng'>
                        <h1><b>THÔNG TIN CỬA HÀNG</b></h1>
                        <img src={thisSTORE.image} alt={thisSTORE.name} />
                        <p><b>ID cửa hàng:</b> {thisSTORE.id}</p>
                        <p><b>Tên cửa hàng:</b> {thisSTORE.name}</p>
                        <p><b>Địa chỉ:</b> {thisSTORE.address}</p>
                        <p><b>Số điện thoại:</b> {thisSTORE.contact}</p>
                    </Tab>
                </Tabs>
            </div>
        </div >
    )
}
