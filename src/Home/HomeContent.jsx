import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Card, Spinner, Carousel } from 'react-bootstrap';
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
                            <option value=''>[Cửa hàng]</option>
                            {STOREs && STOREs.map(store => (
                                <option key={store.id} value={store.id}>{store.name}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='formPod' className='form-group'>
                        <Form.Control as='select' value={selectedPod} onChange={(e) => setSelectedPod(e.target.value)}>
                            <option value=''>[Tên POD]</option>
                            {uniquePodName && uniquePodName.map(pod => (
                                <option key={pod.id} value={pod.name}>{pod.name}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='formType' className='form-group'>
                        <Form.Control as='select' value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                            <option value=''>[Loại POD]</option>
                            {TYPEs && TYPEs.map(type => (
                                <option key={type.id} value={type.id}>{type.name}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='formUtility' className='form-group'>
                        <Form.Control as='select' value={selectedUtility} onChange={(e) => setSelectedUtility(e.target.value)}>
                            <option value=''>[Nội thất]</option>
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

            <h1><b>CƠ SỞ MỚI SẮP RA MẮT!</b></h1>
            <div className='shortcut-booking-pod'>
                {/* <Row className='image-row'>
                    {(STOREs ? STOREs.slice(0, 4) : []).map((store) => ( // Check if STOREs is not null
                        <Col key={store.id} xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} className='image-col'>
                            <Card className='image-card'>
                                <Link to={`booking/store/${store.id}`}><img src={imageSTOREs.find(image => image.id === store.id)?.image} alt={store.name} /></Link>
                                <Card.Body className='card-body'>
                                    <h3><b>{store.name}</b></h3>
                                    <div className='full-detail'>
                                        <div className='short-detail'>
                                            <p>Địa chỉ: {store.address}</p>
                                            <p>Liên hệ: {store.contact}</p>
                                        </div>
                                        <div className='active-button'>
                                            <Link to={`booking/store/${store.id}`}>
                                                <Button className='btn' style={{ backgroundColor: '#28a745' }}>CHỌN</Button>
                                            </Link>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row> */}
                {/* <Row className='image-row'>
                    {(STOREs ? STOREs.slice(0, 1) : []).map((store) => ( // Check if STOREs is not null
                        <Col key={store.id} xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className='image-col'>
                            <Card className='image-card'>
                                <Link to={`booking/store/3`}><img src={imageSTOREs[2].image} alt='Cơ Sở 3' /></Link>
                                <Card.Body className='card-body'>
                                    <h3><b>Cơ Sở 3</b></h3>
                                    <div className='full-detail'>
                                        <div className='short-detail'>
                                            <p>Địa chỉ: {store.address}</p>
                                            <p>Liên hệ: {store.contact}</p>
                                        </div>
                                        <div className='active-button'>
                                            <Link to={`booking/store/3`}>
                                                <Button className='btn' style={{ backgroundColor: '#28a745' }}>CHỌN</Button>
                                            </Link>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row> */}
                <Row xs={1} sm={2} md={4} lg={4} className='image-row'>
                    {STOREs && STOREs.map(store => {
                        return (

                            <Col key={store.id} className='image-col'>
                                <Card className='image-card'>
                                    <Card.Img src={home} alt={store.name} className='pod-image' />

                                    <Card.Body className='card-body'>
                                        <Card.Title className='card-title'>
                                            <h4><b>{store.name}</b></h4>
                                        </Card.Title>
                                        <Card.Text className='card-info'>
                                            <div className='full-detail'>
                                                <div className='short-detail'>
                                                    <p key={store.id}>Địa chỉ: {store.address}</p>
                                                </div>
                                                <span className='short-detail'>
                                                    Đa dạng loại hình:
                                                    <span className='type-list'>
                                                        {TYPEs && TYPEs.map((type, index) => (
                                                            <span key={type.id}>
                                                                {type.name}{index < TYPEs.length - 1 ? ', ' : ''}
                                                            </span>
                                                        ))}
                                                    </span>
                                                </span>
                                                <div className='short-detail'>
                                                    {TYPEs && TYPEs.length > 0 ? (
                                                        <span>{/* Lấy số bé nhất và lớn nhất trong capacity */}
                                                            {Math.min(...TYPEs.map(type => type.capacity))} - {Math.max(...TYPEs.map(type => type.capacity))}
                                                            {/* Hiển thị một icon user */}
                                                            <span className='capacity-icon'> <i className='fa-solid fa-user'></i></span>
                                                        </span>
                                                    ) : null}
                                                </div>
                                                <div>
                                                    {/* {slots && slots.length > 0 ? (
                                                        <span>
                                                            {Math.min(...slots.map(slot => slot.price))} - {Math.max(...slots.map(slot => slot.price))}
                                                            <span className='capacity-icon'> vnđ</span>
                                                        </span>
                                                    ) : null} */}
                                                </div>
                                            </div>
                                            <div className='star-rating' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}> {/* Added flexbox styles */}
                                                <div> {/* Wrap stars in a div for alignment */}
                                                    <span key={store.id} className='yellow-star'>{store.rating}★</span>
                                                </div>
                                            </div>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>

                        );
                    })}
                </Row>
            </div>

            <hr />

            <div className='shortcut-contact'>
                <h1><b>Bạn gặp vấn đề gì sao?</b></h1>
                <div className='card-contact'>
                    <img src={space} alt='space' />
                    <Form className='card-form'>
                        <h1><b>LIÊN HỆ CHÚNG TÔI</b></h1>
                        <Form.Text><p>InnoSpace luôn sẵn sàng lắng nghe câu hỏi và ý kiến đóng góp từ bạn!</p></Form.Text>
                        <Form.Text><p>Chúng tôi sẽ phản hồi ngay trong 24h tiếp theo!</p></Form.Text>

                        <Form.Group controlId='formName' className='form-group form-input'>
                            <Form.Control className='input' type='text' placeholder='Họ tên' />
                        </Form.Group>

                        <Form.Group controlId='formEmail' className='form-group form-input'>
                            <Form.Control className='input' type='text' placeholder='Email' />
                        </Form.Group>

                        <Form.Group controlId='formPhoneNumber' className='form-group form-input'>
                            <Form.Control className='input' type='text' placeholder='Số điện thoại' />
                        </Form.Group>

                        <Form.Group controlId='formYourProblem' className='form-group form-input'>
                            <Form.Control className='input' type='text' placeholder='Vấn đề của bạn' />
                        </Form.Group>
                        <Button className='btn'>SUBMIT</Button>
                    </Form>
                </div>
            </div>

            <hr />

            <div className='shortcut-why'>
                <h1 className='section-title'><b>TẠI SAO CHỌN INNOSPACE?</b></h1>

                <Carousel data-bs-theme="light">
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={home}
                            alt="First slide"
                        />
                        <Carousel.Caption className='carousel-text'>
                            <h5>KHÔNG GIAN LÀM VIỆC ĐA DẠNG</h5>
                            <p>Đáp ứng nhu cầu đa dạng từ các sinh viên, freelancer đến doanh nghiệp nhỏ, với lựa chọn đa dạng từ phòng làm việc cá nhân đến không gian làm việc nhóm.</p>                    </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={home}

                            alt="Second slide"
                        />
                        <Carousel.Caption className='carousel-text'>
                            <h5>QUẢN LÝ ĐẶT CHỖ THÔNG MINH</h5>
                            <p>Giao diện thân thiện, cho phép bạn dễ dàng tìm kiếm và đặt chỗ theo nhu cầu, thời gian và ngân sách.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={home}

                            alt="Third slide"
                        />
                        <Carousel.Caption className='carousel-text'>
                            <h5>DỊCH VỤ TOÀN DIỆN</h5>
                            <p>
                                Hỗ trợ quản lý lịch làm việc, thanh toán trực tuyến và cung cấp các gói dịch vụ linh hoạt kèm các tiện ích.                        </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>

            </div >
        </div >
    )
}
