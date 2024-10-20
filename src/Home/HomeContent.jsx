import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import './HomeContent.css'

import { imageSTOREs } from '../assets/listSTOREs';

import home from '../BackgroundImage/home.jpg'
import space from '../BackgroundImage/space.jpg'

export default function HomeContent() {

    const [STOREs, setSTOREs] = useState(null);
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

    const getCapacity = (typeId) => {
        const type = TYPEs ? TYPEs.find(type => type.id === typeId) : null;
        return type ? type.capacity : 0;
    };

    return (
        <div className='POD-home'>

            <img src={home} alt='home' />

            <div className='shortcut-booking-pod'>
                <h1><b>CƠ SỞ MỚI SẮP RA MẮT!</b></h1>
                <Row className='image-row'>
                    {(STOREs ? STOREs.slice(0, 4) : []).map((store) => ( // Check if STOREs is not null
                        <Col key={store.id} xs={12} sm={12} md={6} lg={6} xl={6} xxl={3} className='image-col'>
                            <Card className='image-card'>
                                <img src={imageSTOREs.find(image => image.id === store.id)?.image} alt={store.name} />
                                <Card.Body className='card-body'>
                                    <h3><b>{store.name}</b></h3>
                                    <div className='full-detail'>
                                        <div className='short-detail'>
                                            <h1></h1>
                                            <p>TypeId: {store.typeId}</p>
                                            <p>StoreId: {store.storeId}</p>
                                        </div>
                                        <div className='active-button'>
                                            <Link to={`booking/store/${store.storeId}/pod/${store.id}`}>
                                                <Button className='btn' style={{ backgroundColor: '#28a745' }}>Select</Button>
                                            </Link>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>

            <div className='shortcut-contact'>
                <h1><b>Bạn gặp vấn đề gì sao?</b></h1>
                <div className='card-contact'>
                    <img src={space} alt='space' />
                    <Form className='card-form'>
                        <h1><b>CONTACT US</b></h1>
                        <Form.Text><p>InnoSpace luôn sẵn sàng lắng nghe câu hỏi và ý kiến đóng góp từ bạn!</p></Form.Text>
                        <Form.Text><p>Chúng tôi sẽ phản hồi ngay trong 24h tiếp theo!</p></Form.Text>

                        <Form.Group controlId='formName' className='form-group form-input'>
                            <Form.Control className='input' type='text' placeholder='Name' />
                        </Form.Group>

                        <Form.Group controlId='formEmail' className='form-group form-input'>
                            <Form.Control className='input' type='text' placeholder='Email' />
                        </Form.Group>

                        <Form.Group controlId='formPhoneNumber' className='form-group form-input'>
                            <Form.Control className='input' type='text' placeholder='Phone Number' />
                        </Form.Group>

                        <Form.Group controlId='formYourProblem' className='form-group form-input'>
                            <Form.Control className='input' type='text' placeholder='Your Problem' />
                        </Form.Group>
                        <Button className='btn'>SUBMIT</Button>
                    </Form>
                </div>
            </div>

        </div >
    )
}
