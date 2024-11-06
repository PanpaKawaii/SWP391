import React from 'react'
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, Form, Button, Tabs, Tab, DropdownButton, Dropdown, Spinner } from 'react-bootstrap';
import './UserBookingDetail.css';

import { imagePODs } from '../../assets/listPODs';

export default function UserBookingDetail() {

    const BookingId = useParams();

    const [id, setId] = useState(null);
    const UserId = localStorage.getItem('UserId');
    useEffect(() => {
        const UserIdInt = parseInt(UserId, 10);
        setId(UserIdInt);
    }, [UserId]);
    const [refresh, setRefresh] = useState(0);

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
    }, [id, refresh]);

    // Lấy Booking này
    const thisBOOKING = BOOKINGs ? BOOKINGs.find(booking => booking.id == BookingId.Id) : null;
    // Lấy những BookingOrder của Booking này
    const filteredBOOKINGORDERs = BOOKINGORDERs ? BOOKINGORDERs.filter(bookingOrder => bookingOrder.bookingId == BookingId.Id) : null;
    // Lấy Slot của Booking này
    const thisSLOTs = SLOTs ? SLOTs.filter(slot => slot.bookings && slot.bookings.some(booking => booking.id == thisBOOKING.id)) : [];
    // Lấy Pod của Booking này
    const thisPOD = PODs ? PODs.find(pod => pod.id == thisBOOKING.podId) : null;
    // Lấy Store của Pod này
    const thisSTORE = STOREs ? STOREs.find(store => store.id == thisPOD.storeId) : null;
    // Lấy Type của Pod này
    const thisTYPE = TYPEs ? TYPEs.find(type => type.id == thisPOD.typeId) : null;

    // Lấy đánh giá của POD dựa trên đánh giá của các Booking
    const getPodBookingRating = (podId) => {
        const booking = BOOKINGs ? BOOKINGs.filter(booking => booking.podId === podId && booking.rating !== null && booking.rating > 0) : [];
        const rating = booking.map(booking => booking.rating).reduce((sum, rating) => sum + rating, 0);
        return (rating / booking.length).toFixed(1);
    };

    const getCategoryName = (productId) => {
        const product = PRODUCTs ? PRODUCTs.find(product => product.id == productId) : null;
        const category = CATEGORYs ? CATEGORYs.find(category => category.id == product.categoryId) : null;
        return category ? category.name : null;
    };

    const getProductName = (productId) => {
        const product = PRODUCTs ? PRODUCTs.find(product => product.id == productId) : null;
        return product ? product.name : null;
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

        if (SubmitRating === 0) {
            alert('Vui lòng đánh giá điểm số từ 1 đến 5');
            return;
        }

        const changeData = {
            id: thisBOOKING.id,
            date: thisBOOKING.date,
            currentDate: thisBOOKING.currentDate,
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
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(changeData),
            });

            if (!response.ok) throw new Error('Network response was not ok');
            // const data = await response.json();
            setLoading(false);
            alert('Đánh giá thành công');
            setRefresh(refresh + 1);
        } catch (error) {
            setError(error);
            console.log('Đánh giá thất bại:', error);
            setLoading(false);
        }
    }

    const handleUpdateBooking = (status) => {
        if (confirm('Bạn có chắc chắn muốn cập nhật trạng thái đơn đặt phòng không?')) {
            UpdateBooking(status);
        }
    }
    const UpdateBooking = async (status) => {

        const changeData = {
            id: thisBOOKING.id,
            date: thisBOOKING.date,
            currentDate: thisBOOKING.currentDate,
            status: status,
            rating: thisBOOKING.rating,
            feedback: thisBOOKING.feedback,
            podId: thisBOOKING.podId,
            userId: thisBOOKING.userId,
        };
        console.log('Change Information Data:', changeData);

        try {
            const response = await fetch(`https://localhost:7166/api/Booking/${thisBOOKING.id}`, {
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
            alert('Cập nhật trạng thái thành công');
            setRefresh(refresh + 1);
        } catch (error) {
            setError(error);
            console.log('Cập nhật trạng thái thất bại:', error);
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
                    <div className='status-booking'>
                        {(() => {
                            switch (thisBOOKING.status) {
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
                                    return <h4><b>{thisBOOKING.status}</b></h4>;
                            }
                        })()}
                        {/* {thisBOOKING.status && (thisBOOKING.status === 'Chưa diễn ra' || thisBOOKING.status === 'Đang diễn ra') && ( */}
                            <DropdownButton id='dropdown-basic-button' title=''>
                                <Dropdown.Item onClick={() => handleUpdateBooking('Đã hủy')}>Hủy đơn đặt phòng</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleUpdateBooking('Đã kết thúc')}>Xác nhận kết thúc</Dropdown.Item>
                            </DropdownButton>
                        {/* )} */}
                    </div>
                </div>

                <Row className='booking-row'>
                    <Col xxl={12} className='booking-col'>
                        <div className='booking-card-body'>
                            <div className='card-image'>
                                {/* <img src={imagePODs.find(image => image.id === thisBOOKING.podId)?.image} alt={getPodName(thisBOOKING.podId)} /> */}
                                <img src={thisPOD.image} alt={thisPOD.name} />
                            </div>
                            <div className='card-detail'>
                                <div className='card-information'>
                                    <p className='booking-id'>ID đơn đặt phòng: {thisBOOKING.id}</p>
                                    <h1><b>{thisPOD.name}</b></h1>
                                    {getPodBookingRating(thisBOOKING.podId) && getPodBookingRating(thisBOOKING.podId) > 0 ?
                                        <span style={{ color: 'gold', fontSize: '1.3em' }}><b>Đánh giá: {getPodBookingRating(thisBOOKING.podId)}</b><i className='fa-solid fa-star'></i></span>
                                        :
                                        <>
                                            {[...Array(thisPOD.rating)].map((_, i) => (
                                                <span key={i} style={{ color: 'gold', fontSize: '1.3em' }}><i className='fa-solid fa-star'></i></span>
                                            ))}
                                            <span>(ĐƯỢC ĐỀ XUẤT)</span>
                                        </>
                                    }
                                    <p><b>Loại:</b> {thisTYPE.name}</p>
                                    <p><b>Địa chỉ:</b> {thisSTORE.name}, {thisSTORE.address}</p>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>

                <Tabs defaultActiveKey='booking' id='uncontrolled-tab-example' className='mb-3 booking-tabs'>
                    <Tab eventKey='booking' title='Đặt phòng'>
                        <div className='tab-content booking-tab'>
                            <h1><b>ĐƠN ĐẶT PHÒNG</b></h1>
                            <p><b>ID đơn đặt phòng:</b> {thisBOOKING.id}</p>
                            <p><b>Ngày đặt:</b> {thisBOOKING.currentDate}</p>
                            <p><b>Trạng thái:</b> {thisBOOKING.status}</p>
                            <p><b>Tổng tiền: <span className='total-amount' style={{ color: '#ee4f2e' }}>{getSumBookingAmount(thisBOOKING.id).toLocaleString('vi-VN')}đ</span></b></p>
                        </div>
                    </Tab>
                    <Tab eventKey='slot' title='Slot'>
                        <div className='tab-content slot-tab'>
                            <h1><b>SLOT ĐÃ ĐẶT</b></h1>
                            <h4><b>Ngày nhận phòng:</b> {thisBOOKING.date.substring(0, 10)}</h4>
                            <Row className='slot-name'>
                                {thisSLOTs && thisSLOTs.map(slot => (
                                    <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6} key={slot.id} className='col'>
                                        <div className='slot-card'>
                                            <p><b>ID slot:</b> {slot.id}</p>
                                            <p><b>Tên slot:</b> {slot.name}</p>
                                            <p><b>Giờ bắt đầu:</b> {thisBOOKING.date.substring(0, 10)} {slot.startTime}:00</p>
                                            <p><b>Giờ kết thúc:</b> {thisBOOKING.date.substring(0, 10)} {slot.endTime}:00</p>
                                            <p><b>Giá slot: <span style={{ color: '#ee4f2e' }}>{slot.price.toLocaleString('vi-VN')}đ</span></b></p>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    </Tab>
                    <Tab eventKey='order' title='Dịch vụ'>
                        <div className='tab-content order-tab'>
                            <h1><b>DỊCH VỤ ĐÃ ĐẶT</b></h1>
                            <Row>
                                {filteredBOOKINGORDERs && filteredBOOKINGORDERs.length !== 0 ? (
                                    filteredBOOKINGORDERs.map((bookingOrder, index) => (
                                        <Col key={index} xxl={6}>
                                            <h3><b>{getProductName(bookingOrder.productId)}</b></h3>
                                            <p><b>Loại dịch vụ:</b> {getCategoryName(bookingOrder.productId)}</p>
                                            <p><b>Mô tả:</b> {getProductDescription(bookingOrder.productId)}</p>
                                            <p>[<b>Giá:</b> {getProductPrice(bookingOrder.productId).toLocaleString('vi-VN')}đ] x [<b>Số lượng:</b> {getBookingOrderQuantity(bookingOrder.id)}]</p>
                                            <p><b>Thành tiền: <span style={{ color: '#ee4f2e' }}>{getBookingOrderAmount(bookingOrder.id).toLocaleString('vi-VN')}đ</span></b></p>
                                        </Col>
                                    ))
                                ) : (
                                    <span>Không có dịch vụ nào.</span>
                                )}
                            </Row>
                        </div>
                    </Tab>
                    <Tab eventKey='user' title='Thông tin của bạn'>
                        <div className='tab-content user-tab'>
                            <h1><b>THÔNG TIN CỦA BẠN</b></h1>
                            <p><b>Họ tên:</b> {USER.name}</p>
                            <p><b>Số điện thoại:</b> {USER.phoneNumber}</p>
                            <p><b>Email:</b> {USER.email}</p>
                            <p><b>Danh hiệu:</b> {USER.type}</p>
                            <p><b>Mô tả:</b> {USER.description}</p>
                        </div>
                    </Tab>
                    <Tab eventKey='payment' title='Thanh toán'>
                        <div className='tab-content payment-tab'>
                            <h1><b>THÔNG TIN THANH TOÁN</b></h1>
                            <Row className='booking-row'>
                                <Col xxl={12} className='booking-col col-1'>
                                    <div className='bookingorder-card-body'>
                                        <div className='card-detail'>
                                            <div>
                                                <h2><b>{thisPOD.name}</b></h2>
                                                <p><b>Giá tiền mỗi slot:</b> {thisSLOTs[0].price.toLocaleString('vi-VN')}đ</p>
                                                <p><b>Số lượng slot:</b> {thisSLOTs.length}</p>
                                            </div>
                                            <div className='card-amount-method-datetime-status'>
                                                <p><b>Thành tiền:</b> {getBookingAmount(thisBOOKING.id).toLocaleString('vi-VN')}đ</p>
                                                <p>{getBookingOrderPaymentMethod(thisBOOKING.id)}</p>
                                                <p><b>Ngày thanh toán:</b> {getBookingPaymentDate(thisBOOKING.id).substring(0, 10)}</p>
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
                                </Col>
                            </Row>
                            <Row className='booking-row'>
                                {filteredBOOKINGORDERs &&
                                    filteredBOOKINGORDERs.map((bookingOrder, index) => (
                                        <Col key={index} xxl={12} className='booking-col col-2'>
                                            <div className='bookingorder-card-body'>
                                                <div className='card-detail'>
                                                    <div>
                                                        <h2><b>{getProductName(bookingOrder.productId)}</b></h2>
                                                        <p><b>Giá tiền:</b> {getProductPrice(bookingOrder.productId).toLocaleString('vi-VN')}đ</p>
                                                        <p><b>Số lượng:</b> {getBookingOrderQuantity(bookingOrder.id)}</p>
                                                    </div>
                                                    <div className='card-amount-method-datetime-status'>
                                                        <p><b>Thành tiền:</b> {getBookingOrderAmount(bookingOrder.id).toLocaleString('vi-VN')}đ</p>
                                                        <p>Thanh toán bằng tiền mặt</p>
                                                        <p><b>Ngày thanh toán:</b> {getBookingOrderDate(bookingOrder.id).substring(0, 10)}</p>
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
                                        </Col>
                                    ))}
                            </Row>
                            <div className='card-amount-success'>
                                <h4><b>Tổng tiền: <span style={{ color: '#ee4f2e' }}>{getSumBookingAmount(thisBOOKING.id).toLocaleString('vi-VN')}đ</span></b></h4>
                                <h4><b>Đã thanh toán: <span style={{ color: '#28a745' }}>{getSumSuccessBookingAmount(thisBOOKING.id).toLocaleString('vi-VN')}đ</span></b></h4>
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey='store' title='Cửa hàng'>
                        <div className='tab-content store-tab'>
                            <h1><b>THÔNG TIN CỬA HÀNG</b></h1>
                            <div className='store-card'>
                                <img src={thisSTORE.image} alt={thisSTORE.name} />
                                <div className='store-card-body'>
                                    <h5><b>ID cửa hàng:</b> {thisSTORE.id}</h5>
                                    <h5><b>Tên cửa hàng:</b> {thisSTORE.name}</h5>
                                    <h5><b>Địa chỉ:</b> {thisSTORE.address}</h5>
                                    <h5><b>Số điện thoại:</b> {thisSTORE.contact}</h5>
                                </div>
                            </div>
                        </div>
                    </Tab>
                </Tabs>

                <div className='booking-card-footer'>
                    {getBookingPaymentStatus(thisBOOKING.id) === 'Đã thanh toán' ? (
                        <div className='rating-container'>
                            <h3><b>Đánh giá của bạn:</b></h3>
                            <Form className='rating-form' onSubmit={handleSubmitFeedback}>

                                <div>
                                    <Form.Group controlId='formRating' className='form-group'>
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} style={{
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
                                        <Form.Control as='textarea' placeholder='Nhập phản hồi của bạn' value={feedback} onChange={(e) => setFeedback(e.target.value)} />
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
        </div >
    )
}
