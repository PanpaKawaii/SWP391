import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Card, Spinner } from 'react-bootstrap';
import './HomeContent.css'

import { imageSTOREs } from '../assets/listSTOREs';

import home from '../BackgroundImage/home3.jpg'
import space from '../BackgroundImage/space.jpg'

export default function HomeContent() {

    const [STOREs, setSTOREs] = useState(null);
    const [PODs, setPODs] = useState(null);
    const [TYPEs, setTYPEs] = useState(null);
    const [UTILITIes, setUTILITIes] = useState(null);
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

                const typeResponse = await fetch('https://localhost:7166/api/Type');
                if (!typeResponse.ok) throw new Error('Network response was not ok');
                const typeData = await typeResponse.json();
                setTYPEs(typeData);

                const utilityResponse = await fetch('https://localhost:7166/api/Utility');
                if (!utilityResponse.ok) throw new Error('Network response was not ok');
                const utilityData = await utilityResponse.json();
                setUTILITIes(utilityData);

                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Những lựa chọn trên thanh tìm kiếm
    const [selectedStore, setSelectedStore] = useState('');
    const [selectedPod, setSelectedPod] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [selectedUtility, setSelectedUtility] = useState('');

    // Lấy Utility được chọn
    const filteredUtilities = UTILITIes ? UTILITIes.filter(utility =>
        utility.id.toString() === selectedUtility.toString() || !selectedUtility.toString()
    ) : [];

    // Lấy Pods của Utility được chọn
    const Pods = (filteredUtilities && filteredUtilities.length > 0) ? filteredUtilities[0].pods : [];

    // Create a new array uniquePodName with unique pod names
    const [uniquePodName, setUniquePodName] = useState([]);

    useEffect(() => {
        if (PODs) {
            const uniquePods = PODs.reduce((acc, current) => {
                const x = acc.find(item => item.name === current.name);
                if (!x) {
                    return acc.concat([current]);
                } else {
                    return acc;
                }
            }, []);
            setUniquePodName(uniquePods);
        }
    }, [PODs]);

    //Lấy Pods trùng khớp với những lựa chọn trên thanh tìm kiếm
    const filteredResults = Pods ? Pods.filter(pod =>
        (pod.storeId == selectedStore || !selectedStore) &&
        (pod.name === selectedPod || !selectedPod) &&
        (pod.typeId.toString() === selectedType.toString() || !selectedType.toString())
    ) : [];

    const getCapacity = (typeId) => {
        const type = TYPEs ? TYPEs.find(type => type.id === typeId) : null;
        return type ? type.capacity : 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ selectedStore, selectedPod, selectedType, selectedUtility });
        console.log('filteredResults', filteredResults);
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
        <div className='POD-home'>

            {/* <img src={home} alt='home' /> */}

            <div className='booking-now'>
                <div className='booking-now-text'>
                    <h1><b>ĐẶT CHỖ NGAY</b></h1>
                    <h1><b>TẠI NƠI CỦA BẠN</b></h1>
                </div>

                <Form className='search' onSubmit={handleSubmit}>

                    <Form.Group controlId='formStore' className='form-group'>
                        <Form.Control as='select' value={selectedStore} onChange={(e) => setSelectedStore(e.target.value)}>
                            <option value=''>[ Store]</option>
                            {STOREs && STOREs.map(store => (
                                <option key={store.id} value={store.id}>{store.name}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='formPod' className='form-group'>
                        <Form.Control as='select' value={selectedPod} onChange={(e) => setSelectedPod(e.target.value)}>
                            <option value=''>[ POD ]</option>
                            {uniquePodName && uniquePodName.map(pod => (
                                <option key={pod.id} value={pod.name}>{pod.name}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='formType' className='form-group'>
                        <Form.Control as='select' value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                            <option value=''>[ Type ]</option>
                            {TYPEs && TYPEs.map(type => (
                                <option key={type.id} value={type.id}>{type.name}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='formUtility' className='form-group'>
                        <Form.Control as='select' value={selectedUtility} onChange={(e) => setSelectedUtility(e.target.value)}>
                            <option value=''>[ Utility ]</option>
                            {UTILITIes && UTILITIes.map(utility => (
                                <option key={utility.id} value={utility.id}>{utility.name}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    {filteredResults && filteredResults.length == 1 ?
                        <Link to={`booking/pod/${filteredResults[0].id}`}><Button type='submit' className='btn'>ĐẶT CHỖ NGAY</Button></Link>
                        : <Button type='submit' className='btn'>ĐẶT CHỖ NGAY</Button>}

                </Form>

                {filteredResults && filteredResults.length == 1 &&
                    <b><p style={{ color: '#28a745', textShadow: '0.4px 0.4px 0 #ffffff' }}>Đi đến POD đó thôi!</p></b>}
                {filteredResults && filteredResults.length == 0 &&
                    <b><p style={{ color: '#dc3545', textShadow: '0.4px 0.4px 0 #ffffff' }}>Không tìm thấy kết quả nào</p></b>}
                {filteredResults && PODs && filteredResults.length > 1 && filteredResults.length !== PODs.length &&
                    <b><p style={{ color: '#ffc107', textShadow: '0.4px 0.4px 0 #ffffff' }}>Có rất nhiều kết quả, vui lòng chọn thêm các tiêu chí khác</p></b>}
                {filteredResults && PODs && filteredResults.length == PODs.length &&
                    <p>Có rất nhiều kết quả cho bạn lựa chọn</p>}
            </div>

            <div className='shortcut-booking-pod'>
                <h1><b>CƠ SỞ MỚI SẮP RA MẮT!</b></h1>
                <Row className='image-row'>
                    {(STOREs ? STOREs.slice(0, 4) : []).map((store) => ( // Check if STOREs is not null
                        <Col key={store.id} xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} className='image-col'>
                            <Card className='image-card'>
                                <Link to={`${store.id}`}><img src={imageSTOREs.find(image => image.id === store.id)?.image} alt={store.name} /></Link>
                                <Card.Body className='card-body'>
                                    <h3><b>{store.name}</b></h3>
                                    <div className='full-detail'>
                                        <div className='short-detail'>
                                            <h1></h1>
                                            <p>Địa chỉ: {store.address}</p>
                                            <p>Liên hệ: {store.contact}</p>
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
