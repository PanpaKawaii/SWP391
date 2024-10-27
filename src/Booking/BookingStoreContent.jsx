import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Form, Button, Spinner } from 'react-bootstrap';
import './BookingStoreContent.css';

import { imageSTOREs } from '../assets/listSTOREs';

export default function BookingStoreContent() {

    const [STOREs, setSTOREs] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
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

                    <Button type='reset' className='btn' onClick={handleReset}>ĐẶT LẠI</Button>

                </Form>

            </div>

            <div className='booking-store-container'>
                <Row className='image-row'>
                    {filteredResults.length > 0 ? (
                        filteredResults.map((store) => (
                            <Col key={store.id} xs={12} sm={12} md={12} lg={12} xl={6} xxl={6} className='image-col'>
                                <Card className='image-card'>
                                    <Link to={`${store.id}`}><img src={imageSTOREs.find(image => image.id === store.id)?.image} alt={store.name} /></Link>
                                    <Card.Body className='card-body'>
                                        <h3><b>{store.name}</b></h3>
                                        <div className='full-detail'>
                                            <div className='short-detail'>
                                                <p>Địa chỉ: {store.address}</p>
                                                <p>Liên hệ: {store.contact}</p>
                                            </div>
                                            <div className='active-button'>
                                                <Link to={`${store.id}`}>
                                                    <Button className='btn'>CHI TIẾT</Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <span>Không tìm thấy cửa hàng nào.</span>
                    )}
                </Row>
            </div>
        </div>
    )
}
