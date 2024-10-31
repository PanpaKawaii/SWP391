import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Form, Button, Spinner } from 'react-bootstrap';
import './BookingStoreContent.css';

import { imageSTOREs } from '../../assets/listSTOREs';

export default function BookingStoreContent() {

    const [STOREs, setSTOREs] = useState(null);
    const [PODs, setPODs] = useState(null);
    const [BOOKINGs, setBOOKINGs] = useState(null);
    const [TYPEs, setTYPEs] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storeResponse = await fetch('https://localhost:7166/api/Store');
                if (!storeResponse.ok) throw new Error('Network response was not ok');
                const storeData = await storeResponse.json();
                setSTOREs(storeData);

                const podResponse = await fetch('https://localhost:7166/api/Pod');
                if (!podResponse.ok) throw new Error('Network response was not ok');
                const podData = await podResponse.json();
                setPODs(podData);

                const bookingResponse = await fetch('https://localhost:7166/api/Booking');
                if (!bookingResponse.ok) throw new Error('Network response was not ok');
                const bookingData = await bookingResponse.json();
                setBOOKINGs(bookingData);

                const typeResponse = await fetch('https://localhost:7166/api/Type');
                if (!typeResponse.ok) throw new Error('Network response was not ok');
                const typeData = await typeResponse.json();
                setTYPEs(typeData);

                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const [selectedStore, setSelectedStore] = useState('');
    const [storeName, setStoreName] = useState('');

    const filteredResults = STOREs ? STOREs.filter(store =>
        (store.name === selectedStore || !selectedStore) &&
        store.name.toLowerCase().includes(storeName.toLowerCase())
    ) : [];

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ selectedStore, storeName });
    };

    const handleReset = () => {
        setSelectedStore('');
        setStoreName('');
    };

    // Lấy đánh giá của STORE dựa trên đánh giá của các Booking
    const getStoreBookingRating = (storeId) => {
        const podsOfStore = PODs ? PODs.filter(pod => pod.storeId == storeId) : [];
        const bookingsOfPods = podsOfStore.length > 0 ? BOOKINGs.filter(booking => podsOfStore.some(pod => pod.id == booking.podId)) : [];
        const filteredBooking = bookingsOfPods ? bookingsOfPods.filter(booking => booking.rating !== null && booking.rating > 0) : [];
        const rating = filteredBooking.map(booking => booking.rating).reduce((sum, rating) => sum + rating, 0);
        return rating / filteredBooking.length;
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
        <div className='POD-booking-store'>

            <div className='search-container'>
                <Form className='search' onSubmit={handleSubmit}>

                    <Form.Group controlId='formStore' className='form-group'>
                        <Form.Control as='select' value={selectedStore} onChange={(e) => setSelectedStore(e.target.value)}>
                            <option value=''>[Cửa hàng]</option>
                            {STOREs && STOREs.map(store => (
                                <option key={store.id} value={store.name}>{store.name}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='formName' className='form-group form-input'>
                        <Form.Control className='input' type='text' placeholder='Tên cửa hàng' value={storeName} onChange={(e) => setStoreName(e.target.value)} />
                    </Form.Group>

                    <Button type='reset' className='btn' onClick={handleReset}>ĐẶT LẠI BỘ LỌC</Button>

                </Form>

            </div>

            <div className='booking-store-container'>
                <Row className='image-row'>
                    {filteredResults.length > 0 ? (
                        filteredResults.map((store) => (
                            <Col lg={12} xl={6} xxl={5} key={store.id} className='image-col'>
                                <Card className='image-card'>
                                    {/* <Link to={`${store.id}`}><img src={imageSTOREs.find(image => image.id === store.id)?.image} alt={store.name} /></Link> */}
                                    {store.status === 'Đang hoạt động' ?
                                        <Link to={`${store.id}`}><img src={store.image} alt={store.name} /></Link>
                                        :
                                        <img src={store.image} alt={store.name} />
                                    }

                                    <Card.Body className='card-body'>
                                        <div className='card-name-rating'>
                                            <h3><b>{store.name}</b></h3>
                                            <span style={{ color: 'gold', fontSize: '2em' }}><b>{getStoreBookingRating(store.id)}</b><i className='fa-solid fa-star'></i></span>
                                        </div>
                                        {store.status === 'Đang hoạt động' && <h5 style={{ color: '#28a745' }}><b>Đang hoạt động</b></h5>}
                                        {store.status === 'Dừng hoạt động' && <h5 style={{ color: '#dc3545' }}><b>Dừng hoạt động</b></h5>}
                                        <div className='card-info'>
                                            <p><b>Địa chỉ:</b> {store.address}</p>
                                            <p><b>Liên hệ:</b> {store.contact}</p>
                                            <p>
                                                <b>Đa dạng loại hình:</b> <span>
                                                    {TYPEs && TYPEs.map((type, index) => (
                                                        <span key={type.id}>
                                                            {type.name}{index < TYPEs.length - 1 ? ', ' : ''}
                                                        </span>
                                                    ))}
                                                </span>
                                            </p>
                                            {TYPEs && TYPEs.length > 0 ?
                                                (
                                                    <p><b>Sức chứa:</b> {Math.min(...TYPEs.map(type => type.capacity))} - {Math.max(...TYPEs.map(type => type.capacity))}
                                                        <span className='capacity-icon'> người <i className='fa-solid fa-user'></i></span>
                                                    </p>
                                                ) : null
                                            }
                                            {/* <div className='active-button'>
                                                {store.status === 'Đang hoạt động' ?
                                                    <Link to={`${store.id}`}><Button className='btn'>CHI TIẾT</Button></Link>
                                                    :
                                                    <Button className='btn'>CHI TIẾT</Button>
                                                }
                                            </div> */}
                                        </div>
                                        {store.status === 'Đang hoạt động' ?
                                            <Link to={`${store.id}`}><Button className='btn'>CHI TIẾT</Button></Link>
                                            :
                                            <Button className='btn'>CHI TIẾT</Button>
                                        }
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <span>Không tìm thấy cửa hàng nào.</span>
                    )}
                </Row>
            </div>
        </div >
    )
}
